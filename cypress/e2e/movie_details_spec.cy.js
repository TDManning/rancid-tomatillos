import details from '../fixtures/movie_details.json';

describe("Movie Details", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://rancid-tomatillos-api.onrender.com/api/v1/movies",
      {
        statusCode: 200,
        fixture: "movie_details",
      }
    );
    cy.intercept(
      "GET",
      "https://rancid-tomatillos-api.onrender.com/api/v1/movies/155",
      {
        statusCode: 200,
        // fixture: "movie_details",
        body: {
          id: 155,
          title: "The Dark Knight",
          overview: "Batman raises the stakes in his war on crime.",
          backdrop_path : "https://image.tmdb.org/t/p/original//nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
          genre_ids: ["Drama", "Action", "Crime", "Thriller"]
        }
      }
    );

    cy.visit("http://localhost:3000");
  });

  it("displays a specific movie poster's details upon clicking on that poster", () => {
    cy.get(".MoviesContainer").should("be.visible"); 

    cy.get("img").first().click();
    cy.get(".MovieDetails").should("be.visible");
    cy.get("h2.title").contains("The Dark Knight").should("be.visible");
    cy.get("p").contains("Batman raises the stakes in his war on crime").should("be.visible");

    cy.get(".movie-image")
      .should("have.attr", "src")
      .and("include", "nMKdUUepR0i5zn0y1T4CsSB5chy.jpg"),

    cy.get(".genre-items").should("contain", "Drama");
    cy.get(".genre-items").should("contain", "Action");
    cy.get(".genre-items").should("contain", "Crime");
    cy.get(".genre-items").should("contain", "Thriller");

    cy.get("img.home-button") 
      .should("be.visible") 
      .and("have.attr", "alt", "Back to home page")
      .click();
    cy.get(".MoviesContainer").should("be.visible");
  })
})

