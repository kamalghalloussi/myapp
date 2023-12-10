const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.model"); 
const articlesService = require("../api/articles/articles.service"); 

describe("tester API articles", () => {
    let token;
    const USER_ID = "fakeUserId";
    const ARTICLE_ID = "fakeArticleId";
    const MOCK_ARTICLES = [
        {
            _id: ARTICLE_ID,
            title: "Article Test",
            content: "Contenu de test",
            user: USER_ID
        },
    ];
    const MOCK_ARTICLE_CREATED = {
        title: "Nouvel Article",
        content: "Contenu du nouvel article",
        user: USER_ID
    };

    beforeEach(() => {
        token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
        mockingoose(Article).toReturn(MOCK_ARTICLES, "find");
        mockingoose(Article).toReturn(MOCK_ARTICLE_CREATED, "save");
    });

    test("[Articles] Get All", async () => {
        const res = await request(app)
            .get("/api/articles")
            .set("x-access-token", token);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("[Articles] Create Article", async () => {
        const res = await request(app)
            .post("/api/articles")
            .send(MOCK_ARTICLE_CREATED)
            .set("x-access-token", token);
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(MOCK_ARTICLE_CREATED.title);
    });

    test("Est-ce articlesService.getAll", async () => {
        const spy = jest
            .spyOn(articlesService, "getAll")
            .mockImplementation(() => "test");
        await request(app).get("/api/articles").set("x-access-token", token);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveReturnedWith("test");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
