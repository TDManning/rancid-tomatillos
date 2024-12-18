describe("Upvote and Downvoting", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://rancid-tomatillos-api.onrender.com/api/v1/movies",
      {
        statusCode: 200,
        fixture: "movie_posters",
      }
    );
    cy.visit("http://localhost:3000");
  });

  it("can upvote a movie", () => {
    cy.get(".MoviePoster")
      .first()
      .find("span")
      .invoke("text")
      .then((text) => parseInt(text, 10))
      .should("be.a", "number")
      .and("equal", 32544);

    cy.intercept(
      "PATCH",
      "https://rancid-tomatillos-api.onrender.com/api/v1/movies/155",
      {
        statusCode: 201,
        body: {
          id: 155,
          poster_path:
            "https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          title: "The Dark Knight",
          vote_count: 32545,
        },
      }
    );
    cy.get(".vote-button").first().click();
    cy.get(".MoviePoster")
      .first()
      .find("span")
      .invoke("text")
      .then((text) => parseInt(text, 10))
      .should("be.a", "number")
      .and("equal", 32545);
  });

  it("can downvote a movie", () => {
    cy.get(".MoviePoster")
      .last()
      .find("span")
      .invoke("text")
      .then((text) => parseInt(text, 10))
      .should("be.a", "number")
      .and("equal", 27642);

    cy.intercept(
      "PATCH",
      "https://rancid-tomatillos-api.onrender.com/api/v1/movies/680",
      {
        statusCode: 201,
        body: {
          id: 680,
          poster_path:
            "https://image.tmdb.org/t/p/original//d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
          title: "Pulp Fiction",
          vote_count: 27641,
        },
      }
    );
    cy.get(".vote-button").last().click();
    cy.get(".MoviePoster")
      .last()
      .find("span")
      .invoke("text")
      .then((text) => parseInt(text, 10))
      .should("be.a", "number")
      .and("equal", 27641);
  });
});
