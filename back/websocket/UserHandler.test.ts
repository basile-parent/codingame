import Player from "../model/Player";
import UserHandler from "./UserHandler";

describe("Userhandler tests", () => {

    describe('calculateAllPlayerScoreAndPosition tests', function () {
        it("should calculate the player total score and set the previous score", () => {
            // Given
            const userHandler = new UserHandler()
            userHandler["PLAYERS"] = [
                { score: 100, previousScore: undefined, topics: [ { score: 100 }, { score: 200 }, { score: undefined } ] } as Player
            ]

            // When
            userHandler.calculateAllPlayerScoreAndPosition()

            // Then
            expect(userHandler["PLAYERS"][0].score).toEqual(300)
            expect(userHandler["PLAYERS"][0].previousScore).toEqual(100)
        })

        it("should set the position and previous position after calculating the score for all players", () => {
            // Given
            const userHandler = new UserHandler()
            userHandler["PLAYERS"] = [
                { score: 1000, previousScore: 500, position: 1, topics: [ { score: 500 }, { score: 500 }, { score: 0 } ] } as Player,
                { score: 0, previousScore: 0, position: 2, topics: [ { score: 0 }, { score: 0 },  { score: 2000 } ] } as Player,
            ]

            // When
            userHandler.calculateAllPlayerScoreAndPosition()

            // Then
            expect(userHandler["PLAYERS"][0].previousPosition).toEqual(1)
            expect(userHandler["PLAYERS"][0].position).toEqual(2)

            expect(userHandler["PLAYERS"][1].previousPosition).toEqual(2)
            expect(userHandler["PLAYERS"][1].position).toEqual(1)
        })

        it("should set the same position for players with the same score", () => {
            // Given
            const userHandler = new UserHandler()
            userHandler["PLAYERS"] = [
                { score: 0, previousScore: undefined, topics: [ { score: 500 }, ] } as Player,
                { score: 0, previousScore: undefined, topics: [ { score: 500 }, ] } as Player,
                { score: 0, previousScore: undefined, topics: [ { score: 1000 }, ] } as Player,
                { score: 0, previousScore: undefined, topics: [ { score: 1000 }, ] } as Player,
                { score: 0, previousScore: undefined, topics: [ { score: 0 }, ] } as Player,
            ]

            // When
            userHandler.calculateAllPlayerScoreAndPosition()

            // Then
            expect(userHandler["PLAYERS"][0].position).toEqual(3)
            expect(userHandler["PLAYERS"][1].position).toEqual(3)
            expect(userHandler["PLAYERS"][2].position).toEqual(1)
            expect(userHandler["PLAYERS"][3].position).toEqual(1)
            expect(userHandler["PLAYERS"][4].position).toEqual(5)
        })

    })


    describe('approvePlayer tests', function () {
        it("approvePlayer should update the designed player", () => {
            // Given
            const userHandler = new UserHandler()
            userHandler["PLAYERS"] = [
                {uuid: "a", waitForApprouval: true,} as Player,
                {uuid: "b", waitForApprouval: true,} as Player,
            ]

            // When
            userHandler.approvePlayer("a")

            // Then
            expect(userHandler["PLAYERS"][0].waitForApprouval).toBeFalsy()
            expect(userHandler["PLAYERS"][1].waitForApprouval).toBeTruthy()
        })
    })

})