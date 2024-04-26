import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import { Readable } from 'stream';


const keyFile = 'gestion-bibiotheque-1ef8c6a851e1.json'; // Path to your service account key file

const auth = new google.auth.GoogleAuth({
    // credentials: { client_email: process.env.CLIENT_EMAIL, private_key: process.env.PRIVATE_KEY,  },
    keyFile,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
    // Adjust scopes as needed
});

const drive = google.drive({ version: 'v3', auth });

export async function GET(req: NextRequest) {
    try {
        const folderId = '12asKpL4XRYT9ZGcqIlbWokGWwUw4fdAT'; // Specify the folder ID

        // Example: Upload an image from a local path
        const response = await drive.files.create({
            requestBody: {
                name: 'luffy.jpg',
                parents: [folderId],
            },
            media: {
                mimeType: 'image/jpeg',
                body: fs.createReadStream('C:/Users/gigab/Desktop/luffy.jpg'),
            },
        });

        // Extract file ID from response
        const fileId = response.data.id;

        // Generate public link for the uploaded image
        const publicLink = `https://drive.google.com/uc?id=${fileId}`;

        console.log('Image uploaded to Google Drive:', publicLink);
        return NextResponse.json({ message: 'Image uploaded to Google Drive!', link: publicLink }, { status: 200 });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Image upload failed.' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {

        const formData = await req.formData();
        const file: any = formData.get('file');
        const filename: any = formData.get("fileName")
        console.log("filename : ", filename);
        const fileBuffer = file.stream();

        const folderId = '12asKpL4XRYT9ZGcqIlbWokGWwUw4fdAT'; // Specify the folder ID

        const response = await drive.files.create({
            requestBody: {
                name: filename,
                parents: [folderId],
            },
            media: {
                mimeType: file.type,
                body: Readable.from(fileBuffer),
            },
        });

        // Extract file ID from response
        const fileId = response.data.id;

        // Get the file to retrieve the webViewLink
        const fileResponse = drive.files.get({
            fileId: fileId!,
            fields: 'webViewLink',//webContentLink
        });

        const webViewLink = (await fileResponse).data.webViewLink;
        console.log("webViewLink: ", webViewLink);

        return NextResponse.json({ message: 'Image uploaded to Google Drive!', link: webViewLink }, { status: 200 });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Image upload failed.' }, { status: 500 });
    }
}
