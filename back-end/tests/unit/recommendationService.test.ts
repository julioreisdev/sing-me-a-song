import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService";
import recommendationsFactory from "./factories/recommendationsFactory.js";

describe("Testa função insert do recommendationService.ts", () => {
  it("Deve cadastrar uma recomendação.", async () => {
    const recommendation = await recommendationsFactory.createRecommendation();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    await recommendationService.insert(recommendation);

    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });
  it("Não deve cadastrar uma recomendação já cadastrada.", async () => {
    const recommendation =
      await recommendationsFactory.getUniqueRecommendation();
    const newRecommendation =
      await recommendationsFactory.createRecommendation();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return recommendation;
      });

    const response = recommendationService.insert(newRecommendation);
    expect(response).rejects.toEqual({
      type: "conflict",
      message: "Recommendations names must be unique",
    });
  });
});

describe("Testa função upvote do recommendationService.ts", () => {
  it("Dá upvote em recommendação cadastrada", async () => {
    const recommendation =
      await recommendationsFactory.getUniqueRecommendation();
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return recommendation;
      });
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});
    await recommendationService.upvote(1);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("Não dá upvote em recomendação não cadastrada", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});

    const response = recommendationService.upvote(1);
    expect(response).rejects.toEqual({
      type: "not_found",
      message: "",
    });
  });
});

describe("Testa função downvote do recommendationService.ts", () => {
  it("Dá downvote em uma recomendação cadastrada.", async () => {
    const recommendation =
      await recommendationsFactory.getUniqueRecommendation();
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return recommendation;
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return recommendation;
      });
    await recommendationService.downvote(1);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("Não dá downvote em uma recomendação não cadastrada", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});
    const response = recommendationService.downvote(1);
    expect(response).rejects.toEqual({
      type: "not_found",
      message: "",
    });
  });
  it("Deve deletar recomendação com score menor que -5", async () => {
    const recommendation =
      await recommendationsFactory.getUniqueRecommendation();
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return recommendation;
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return { ...recommendation, score: -10 };
      });
    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});
    await recommendationService.downvote(1);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).toBeCalled();
  });
});

describe("Testa função getRandom do recommendationService.ts", () => {
  it("Retorna item aleatório", async () => {
    const recommendation1 =
      await recommendationsFactory.getUniqueRecommendation();
    const recommendation2 =
      await recommendationsFactory.getUniqueRecommendation();
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [recommendation1, recommendation2];
      });

    const response = await recommendationService.getRandom();
    expect(response.id).toBe(recommendation1.id);
  });
  it("Não retorna item aleatório", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [];
      });
    const response = recommendationService.getRandom();
    expect(response).rejects.toEqual({
      type: "not_found",
      message: "",
    });
  });
});

describe("Testa função get do recommendationService.ts", () => {
  it("Retorna um array", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return [];
      });
    await recommendationService.get();
    expect(recommendationRepository.findAll).toBeCalled();
  });
});

describe("Testa função getByIdOrFail do recommendationService.ts", () => {
  it("Retorna uma recomendação se busca com id válido.", async () => {
    const recommendation =
      await recommendationsFactory.getUniqueRecommendation();
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return recommendation;
      });
    const response = await recommendationService.getById(1);
    expect(recommendationRepository.find).toBeCalled();
    expect(response).toBe(recommendation);
  });
  it("Não retorna uma recomendação se busca com id inválido.", async () => {
    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {});
    const response = recommendationService.getById(1);
    expect(response).rejects.toEqual({
      type: "not_found",
      message: "",
    });
  });
});

describe("Testa a função getTop do recommendationService.ts", () => {
  it("Deve retornar um array", async () => {
    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {
        return [];
      });
    const response = await recommendationService.getTop(1);
    expect(response).toBeInstanceOf(Array);
    expect(recommendationRepository.getAmountByScore).toBeCalled();
  });
});
