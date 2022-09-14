import TopicShortest from "./TopicShortest"
import Topic from "../types/Topic"
import {PlayerTopic} from "../types/GamePlayer"

describe("Topic Shortest tests", () => {
    describe("Position calculation tests", () => {

        it("should calculate the position based on the completion if the completion is not the same for all players", () => {
            // Given
            const initialTopic = {} as Topic
            const topic = new TopicShortest(initialTopic)
            let playerTopics = [
                {playerUuid: "player1", completion: 0.5, codeLength: 100} as PlayerTopic,
                {playerUuid: "player2", completion: 1, codeLength: 200} as PlayerTopic,
                {playerUuid: "player3", completion: 0.2, codeLength: 150} as PlayerTopic,
            ]

            // When
            const playerTopicsWithPosition = topic._calculatePosition(playerTopics)

            // Then
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player1").position).toEqual(2)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player2").position).toEqual(1)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player3").position).toEqual(3)
        })

        it("should calculate the position based on the code length if the completion is the same", () => {
            // Given
            const initialTopic = {} as Topic
            const topic = new TopicShortest(initialTopic)
            let playerTopics = [
                {playerUuid: "player1", completion: 1, codeLength: 200} as PlayerTopic,
                {playerUuid: "player2", completion: 1, codeLength: 100} as PlayerTopic,
                {playerUuid: "player3", completion: 1, codeLength: 300} as PlayerTopic,
            ]

            // When
            const playerTopicsWithPosition = topic._calculatePosition(playerTopics)

            // Then
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player1").position).toEqual(2)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player2").position).toEqual(1)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player3").position).toEqual(3)
        })

        it("should calculate the position ignoring the duration if the completion and code length are the same", () => {
            // Given
            const initialTopic = {} as Topic
            const topic = new TopicShortest(initialTopic)
            let playerTopics = [
                {playerUuid: "player1", completion: 1, codeLength: 200, duration: 234000} as PlayerTopic,
                {playerUuid: "player2", completion: 1, codeLength: 200, duration: 123000} as PlayerTopic,
                {playerUuid: "player3", completion: 1, codeLength: 200, duration: 345000} as PlayerTopic,
            ]

            // When
            const playerTopicsWithPosition = topic._calculatePosition(playerTopics)

            // Then
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player1").position).toEqual(1)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player2").position).toEqual(1)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player3").position).toEqual(1)
        })

    })

    describe("Score calculation tests", () => {

        it("should set a score proportional to the maximum score (depending on the position) when players have 100% completion", () => {
            // Given
            const initialTopic = {
                points: 1000
            } as Topic
            const topic = new TopicShortest(initialTopic)
            let playerTopics = [
                {playerUuid: "player1", completion: 1, codeLength: 150} as PlayerTopic, // Calculated position = 2
                {playerUuid: "player2", completion: 1, codeLength: 100} as PlayerTopic, // Calculated position = 1
                {playerUuid: "player3", completion: 1, codeLength: 200} as PlayerTopic, // Calculated position = 3
            ]

            // When
            const playerTopicsWithPosition = topic.calculateScore(playerTopics)

            // Then
            // point range = 1000 / 2.5 = 400 ==> Each place make loose 200 points
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player1").score).toEqual(800)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player2").score).toEqual(1000)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player3").score).toEqual(600)
        })

        it("should the same score for same position players", () => {
            // Given
            const initialTopic = {
                points: 1000
            } as Topic
            const topic = new TopicShortest(initialTopic)
            let playerTopics = [
                {playerUuid: "player1", completion: 1, codeLength: 100} as PlayerTopic, // Calculated position = 1
                {playerUuid: "player2", completion: 1, codeLength: 100} as PlayerTopic, // Calculated position = 1
                {playerUuid: "player3", completion: 1, codeLength: 200} as PlayerTopic, // Calculated position = 3
            ]

            // When
            const playerTopicsWithPosition = topic.calculateScore(playerTopics)

            // Then
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player1").score).toEqual(1000)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player2").score).toEqual(1000)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player3").score).toEqual(600)
        })

        it("should set a score proportional to the completion and position when players have beyond 100% completion ", () => {
            // Given
            const initialTopic = {
                points: 1000
            } as Topic
            const topic = new TopicShortest(initialTopic)
            let playerTopics = [
                {playerUuid: "player1", completion: 0.6, codeLength: 150} as PlayerTopic, // Calculated position = 2
                {playerUuid: "player2", completion: 0.6, codeLength: 100} as PlayerTopic, // Calculated position = 1
                {playerUuid: "player3", completion: 0.6, codeLength: 200} as PlayerTopic, // Calculated position = 3
            ]

            // When
            const playerTopicsWithPosition = topic.calculateScore(playerTopics)

            // Then
            // Score calculation:
            // - max points = 1000 / 1.5 = 666.6666...7 (because completion is not 100%)
            // - point range = max points / 2.5 = 2665,6666...7
            // - position coeff = (player position - 1) / (player count - 1)
            // - score = (max points - (point range * position coeff)) * completion
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player1").score).toEqual(320)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player2").score).toEqual(400)
            expect(playerTopicsWithPosition.find(pt => pt.playerUuid === "player3").score).toEqual(240)
        })

        it("should always set a bigger score on players with 100% completion than on player with less completion", () => {
            // Given
            const initialTopic = {
                points: 1000
            } as Topic
            const topic = new TopicShortest(initialTopic)
            let playerTopics = [
                {playerUuid: "player1", completion: 1, codeLength: 1500000} as PlayerTopic,
                {playerUuid: "player2", completion: 0.99, codeLength: 1} as PlayerTopic,
            ]

            // When
            const playerTopicsWithPosition = topic.calculateScore(playerTopics)

            // Then
            const player1Score = playerTopicsWithPosition.find(pt => pt.playerUuid === "player1").score
            const player2Score = playerTopicsWithPosition.find(pt => pt.playerUuid === "player2").score
            expect(player1Score).toBeGreaterThan(player2Score)
        })

    })
})