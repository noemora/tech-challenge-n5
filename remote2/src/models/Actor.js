// Actor model responsible for data transformation
export class Actor {
  constructor(id, name, profilePath, character) {
    this.id = id;
    this.name = name;
    this.profilePath = profilePath;
    this.character = character;
  }

  static fromApiResponse(apiActor) {
    return new Actor(
      apiActor.id,
      apiActor.name,
      apiActor.profile_path,
      apiActor.character || 'Unknown'
    );
  }

  toCardProps(imageUrlGetter) {
    return {
      id: this.id,
      name: this.name,
      image: imageUrlGetter(this.profilePath),
      description: `Character: ${this.character}`,
    };
  }
}

// Factory for creating actors from API data
export class ActorFactory {
  static createActorsFromCredits(creditsData, limit = 10) {
    return creditsData.cast
      .slice(0, limit)
      .map((actorData) => Actor.fromApiResponse(actorData));
  }
}
