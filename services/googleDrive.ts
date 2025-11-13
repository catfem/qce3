
const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_API_URL = 'https://www.googleapis.com/upload/drive/v3/files';

const getFolderId = async (folderName: string, accessToken: string): Promise<string> => {
    const response = await fetch(`${DRIVE_API_URL}/files?q=name='${folderName}' and mimeType='application/vnd.google-apps.folder'`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to search for folder in Google Drive');
    }

    const data = await response.json();
    if (data.files.length > 0) {
        return data.files[0].id;
    } else {
        const folderMetadata = {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
        };

        const createResponse = await fetch(`${DRIVE_API_URL}/files`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(folderMetadata),
        });

        if (!createResponse.ok) {
            throw new Error('Failed to create folder in Google Drive');
        }

        const folderData = await createResponse.json();
        return folderData.id;
    }
};

const uploadFile = async (fileName: string, content: string, accessToken: string): Promise<{id: string, name: string}> => {
    const folderId = await getFolderId('U3', accessToken);

    const metadata = {
        name: fileName,
        parents: [folderId],
    };

    const multipartRequestBody =
        `--foo_bar_baz\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        `${JSON.stringify(metadata)}\r\n` +
        `--foo_bar_baz\r\n` +
        `Content-Type: application/octet-stream\r\n\r\n` +
        `${content}\r\n` +
        `--foo_bar_baz--`;

    const response = await fetch(`${DRIVE_UPLOAD_API_URL}?uploadType=multipart`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/related; boundary=foo_bar_baz',
        },
        body: multipartRequestBody,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to upload file to Google Drive: ${error.error.message}`);
    }

    const data = await response.json();
    return {
        id: data.id,
        name: data.name,
    };
};

const googleDriveService = {
  uploadFile,
};

export default googleDriveService;
