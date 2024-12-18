// Mock data to use for testing:
import movie_posters from "../fixtures/movie_posters.json";
// import details from '../fixtures/movie_details.json' (you will need to add your own mock data to this file!)

describe("Main Page", () => {
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
  it("displays title on page load", () => {
    // hint: you'll want to add an intercept here if you are making a network request on page load!
    cy.get("h1").contains("rancid tomatillos");
  });

  it("displays collection of movies", () => {
    cy.get(".MoviesContainer").should("exist");
    cy.get(".MoviePoster").should("exist");
    cy.get(".MoviePoster").should("have.length", 4);
    cy.get(".MoviePoster")
      .first()
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg"
      );
    cy.get(".MoviePoster")
      .first()
      .find("span")
      .invoke("text")
      .then((text) => parseInt(text, 10))
      .should("be.a", "number")
      .and("equal", 32544);
    cy.get(".MoviePoster")
      .last()
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://image.tmdb.org/t/p/original//d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
      );
    cy.get(".MoviePoster")
      .last()
      .find("span")
      .invoke("text")
      .then((text) => parseInt(text, 10))
      .should("be.a", "number")
      .and("equal", 27642);

    cy.get(".vote-button").first().contains("⬆");
    cy.get(".vote-button").last().contains("⬇");
  });

  describe("Sad Paths", () => {
    beforeEach(() => {
      cy.intercept(
        "GET",
        "https://rancid-tomatillos-api.onrender.com/api/v1/movies",
        {
          statusCode: 500,
          body: "Failed to fetch movies",
        }
      );
      cy.visit("http://localhost:3000");
    });

    it("should return an error message", () => {
      cy.get(".error-message").contains("Failed to fetch movies");
    });
  });
});
