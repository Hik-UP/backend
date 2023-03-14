const dbTrailSelector = {
  id: true,
  name: true,
  address: true,
  description: true,
  pictures: true,
  latitude: true,
  longitude: true,
  difficulty: true,
  duration: true,
  distance: true,
  uphill: true,
  downhill: true,
  tools: true,
  relatedArticles: true,
  labels: true,
  geoJSON: true,
  comments: {
    select: {
      id: true,
      author: {
        select: {
          username: true,
          picture: true
        }
      },
      body: true,
      pictures: true,
      date: true
    }
  }
};

export { dbTrailSelector };
