describe("Connect to test db", () => {
  it("Can connect to test db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    )
  })

  it("input entries to the db", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
    (1, "Ivan", "06-2022", "Kaliningrad"),
    (2, "Anna", "06-2022", "Gdansk"),
    (3, "Andrey", "01-2023", "London")`
    ).then((result) => {
      cy.log(JSON.stringify(result))
      expect(result.affectedRows).to.equal(3)
    })
  })

  it("select from db", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE City ="London"`
    ).then((result) => {
      cy.log(JSON.stringify(result))
    })
  })

  it("add 2 students to the db", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
    (4, "Ruslan", "02-2023", "Barselona"),
    (5, "Irina", "02-2022", "Minsk"),
    (6, "Roman", "06-2022", "Gdansk"),
    (7, "Olga", "01-2023", "Berlin")`
    ).then((result) => {
      cy.log(JSON.stringify(result))
      expect(result.affectedRows).to.equal(4)
    })
  })

  it("select from db all students where StudentGroup= 06-2022", () => {
    cy.task(
      "queryDb",
      `SELECT * FROM Students where StudentGroup="06-2022"`
    ).then((result) => {
      cy.log(JSON.stringify(result))
      expect(result[0].StudentID).to.equal(1)
      expect(result[0].FirstName).to.equal("Ivan")
      expect(result[0].City).to.equal("Kaliningrad")
    })
  })

  it("Can be delete the db", () => {
    cy.task("queryDb", "DROP TABLE Students")
  })
})
