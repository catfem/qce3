
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Assuming Gemini key can be used for Drive API too, might need separate key
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

let tokenClient: google.accounts.oauth2.TokenClient | null = null;
let gapiInited = false;
let gisInited = false;

const initClient = async () => {
  await new Promise<void>((resolve, reject) => {
    gapi.load('client', {
      callback: () => {
        gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        }).then(() => {
          gapiInited = true;
          resolve();
        }).catch(reject);
      },
      onerror: reject
    });
  });

  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: () => {}, // Callback is handled by the promise in authenticate
  });
  gisInited = true;
};

const authenticate = async () => {
  if (!gapiInited || !gisInited) {
    await initClient();
  }

  return new Promise<void>((resolve, reject) => {
    const callback = (resp: google.accounts.oauth2.TokenResponse) => {
      if (resp.error) {
        return reject(resp);
      }
      gapi.client.setToken({ access_token: resp.access_token });
      resolve();
    };

    if (gapi.client.getToken() === null) {
      tokenClient!.requestAccessToken({ prompt: 'consent', callback });
    } else {
      tokenClient!.requestAccessToken({ prompt: '', callback });
    }
  });
};

const uploadFile = async (fileName: string, content: string): Promise<{id: string, name: string}> => {
  await authenticate();

  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  const metadata = {
    name: fileName,
    mimeType: 'application/octet-stream',
  };

  const multipartRequestBody =
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: application/octet-stream\r\n\r\n' +
      content +
      close_delim;

  const request = await gapi.client.request({
      path: 'https://www.googleapis.com/upload/drive/v3/files',
      method: 'POST',
      params: { uploadType: 'multipart' },
      headers: {
        'Content-Type': 'multipart/related; boundary="' + boundary + '"'
      },
      body: multipartRequestBody
  });

  return {
    id: request.result.id,
    name: request.result.name,
  };
};

const googleDriveService = {
  authenticate,
  uploadFile,
};

export default googleDriveService;
