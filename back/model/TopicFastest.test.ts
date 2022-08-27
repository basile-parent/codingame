import TopicFastest from "./TopicFastest";
import Topic from "../types/Topic";
import {PlayerTopic} from "../types/GamePlayer";

describe("Topic Fastest tests", () => {
    it("should set the maximum score when player have 100% completion and are beyond the max point time limit", () => {
        // Given
        const initialTopic = {
            points: 1000,
            timer: 800000,
            maxPointsTimer: 500000,
        } as Topic
        const topic = new TopicFastest(initialTopic)
        let playerTopics = [
            { playerUuid: "player1", completion: 1, duration: 123000 } as PlayerTopic,
            { playerUuid: "player2", completion: 1, duration: 234000 } as PlayerTopic,
        ]

        // When
        const playerTopicsWithScore = topic.calculateScore(playerTopics)

        // Then
        expect(playerTopicsWithScore.find(pt => pt.playerUuid === "player1").score).toEqual(1000)
        expect(playerTopicsWithScore.find(pt => pt.playerUuid === "player2").score).toEqual(1000)
    })

    it("should set a score proportional to completion when player have beyond 100% completion and are beyond the max point time limit", () => {
        // Given
        const initialTopic = {
            points: 1000,
            timer: 800000,
            maxPointsTimer: 500000,
        } as Topic
        const topic = new TopicFastest(initialTopic)
        let playerTopics = [
            { playerUuid: "player1", completion: 0.5, duration: 123000 } as PlayerTopic,
            { playerUuid: "player2", completion: 0, duration: 234000 } as PlayerTopic,
        ]

        // When
        const playerTopicsWithScore = topic.calculateScore(playerTopics)

        // Then
        expect(playerTopicsWithScore.find(pt => pt.playerUuid === "player1").score).toEqual(333) // 1000 / 1.5 * 0.5
        expect(playerTopicsWithScore.find(pt => pt.playerUuid === "player2").score).toEqual(0)
    })

    it("should set a score proportional to timer when player have 100% completion and are above the max point time limit", () => {
        // Given
        const initialTopic = {
            points: 1000,
            timer: 800000,
            maxPointsTimer: 500000,
        } as Topic
        const topic = new TopicFastest(initialTopic)
        let playerTopics = [
            { playerUuid: "player1", completion: 1, duration: 500000 } as PlayerTopic,
            { playerUuid: "player2", completion: 1, duration: 501000 } as PlayerTopic,
            { playerUuid: "player3", completion: 1, duration: initialTopic.timer - 1 } as PlayerTopic,
        ]

        // When
        const playerTopicsWithScore = topic.calculateScore(playerTopics)

        // Then
        expect(playerTopicsWithScore.find(pt => pt.playerUuid === "player1").score).toEqual(1000)
        expect(playerTopicsWithScore.find(pt => pt.playerUuid === "player2").score).toEqual(998)
        expect(playerTopicsWithScore.find(pt => pt.playerUuid === "player3").score).toEqual(500)
    })

    it("should set a score proportional to timer and completion when player have beyond 100% completion and are above the max point time limit", () => {
        // Given
        const initialTopic = {
            points: 1000,
            timer: 800000,
            maxPointsTimer: 500000,
        } as Topic
        const topic = new TopicFastest(initialTopic)
        let playerTopics = [
            { playerUuid: "player1", completion: 0.5, duration: 502000 } as PlayerTopic,
            { playerUuid: "player2", completion: 0.01, duration: initialTopic.timer - 1 } as PlayerTopic,
        ]

        // When
        const playerTopicsWithScore = topic.calculateScore(playerTopics)

        // Then
        expect(playerTopicsWithScore.find(pt => pt.playerUuid === "player1").score).toEqual(332) // 997 / 1.5 * 0.5
        expect(playerTopicsWithScore.find(pt => pt.playerUuid === "player2").score).toEqual(3) // 502 / 1.5 * 0.01
    })

})