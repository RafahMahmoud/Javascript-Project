class Movies {
  constructor(
    name,
    description,
    mainActors,
    verticleImage,
    horizontalImage,
    genre,
    language,
    productionYear,
    id,
    director,
    duration,
    reviews
  ) {
    this.name = name;
    this.description = description;
    this.mainActors = mainActors;
    this.verticleImage = verticleImage;
    this.horizontalImage = horizontalImage;
    this.genre = genre;
    this.language = language;
    this.productionYear = productionYear;
    this.id = id;
    this.director = director;
    this.duration = duration;
    this.reviews=reviews
  }
}

export {Movies};