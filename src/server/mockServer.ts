interface UrlType {
  url: string;
  type: "file" | "folder";
}

const urlList: UrlType[] = [
  {
    url: "https://example.com/file.pdf",
    type: "file"
  },
  {
    url: "http://example.com/folder/",
    type: "folder"
  }
];

export default function getUrl(url: string): Promise<UrlType> {
  const result = urlList.find(u => u.url === url);

  if (result === undefined) {
    throw Error("Not Found");
  }

  return new Promise(resolve => {
    resolve(result);
  });
}
