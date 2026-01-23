export const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())
export const fetcherForArray = (urls: string[]) => {
  return Promise.all(urls.map(url => fetch(url).then(res => res.json())))
}