import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const fileUpload = async (fileBuffer: Buffer, fileName: string) => {
  const response = await client.files.upload({
    file: await toFile(Buffer.from(fileBuffer), "avatar"),
    fileName: fileName,
  });
  return response;
};

export { fileUpload };
