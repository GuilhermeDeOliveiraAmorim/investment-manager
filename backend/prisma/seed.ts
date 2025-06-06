import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Asset {
  constructor(public readonly id: string, public name: string) {}

  static create(name: string): Asset {
    return new Asset(crypto.randomUUID(), name);
  }
}

async function main() {
  const assets = [
    "Tesouro Selic",
    "Tesouro IPCA+",
    "CDB Banco X",
    "LCI Banco Y",
    "Fundo Imobiliário Z",
    "ETF IVVB11",
    "Ação PETR4",
    "Ação VALE3",
    "Bitcoin",
    "Ethereum",
    "Debêntures",
    "Fundo Multimercado",
    "Crédito Privado",
    "Fundos de Renda Fixa",
    "Ação ITUB4",
    "Ação BBDC4",
    "Ação MGLU3",
    "Fundo de Ações",
    "Fundo Cambial",
    "Criptomoeda ADA",
  ].map((name) => Asset.create(name));

  await prisma.asset.createMany({
    data: assets.map((a) => ({ id: a.id, name: a.name })),
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => prisma.$disconnect());
