package trabalholuciano;

import java.util.Scanner;

public class Programa {

	public static void main(String[] args) {
		Sistema sis = new Sistema();
		sis.init();
		System.out.println("Operacoes iniciadas.");
		boolean running = true;
		Scanner scn = new Scanner(System.in);
		while (running) {
			System.out.println();
			System.out.println("Digite 0 se quiser inserir produtos");
			System.out.println("Digite 1 se quiser deletar produtos");
			System.out.println("Digite 2 se quiser alterar dados de algum produto");
			System.out.println("Digite 3 se quiser listar os produtos em ordem de insercao");
			System.out.println("Digite 4 se quiser exibir dados de um produto especifico");
			System.out.println("Digite 5 se quiser exibir os produtos por ordem alfabetica");
			System.out.println("Digite 6 se quiser alterar o tamanho das colunas da tabela dos produtos");
			System.out.println("Digite 7 se quiser finalizar as operacoes");
			int opc;
			do {
				opc = scn.nextInt();
			} while (opc < 0 || opc > 7);
			switch (opc) {
			case 0:
				System.out.println("Digite o nome do produto");
				Produto produto = new Produto();
				produto.nome = scn.nextLine();
				produto.nome = scn.nextLine();
				while (produto.nome.isEmpty()) {
					System.out.println("Nome vazio não pode.");
					produto.nome = scn.nextLine();
				}
				System.out.println("Digite a marca do produto");
				produto.marca = scn.nextLine();
				while (produto.marca.isEmpty()) {
					System.out.println("Marca vazia não pode.");
					produto.marca = scn.nextLine();
				}
				System.out.println("Digite o preco do produto");
				produto.preco = scn.nextDouble();
				while (produto.preco <= 0) {
					System.out.println("Preço negativo ou igual a 0! Determine outro: ");
					produto.preco = scn.nextDouble();
				}
				System.out.println("Digite a quantidade do produto");
				produto.qtd = scn.nextInt();
				while (produto.qtd <= 0) {
					System.out.println("Quantidade negativa! Determine outra: ");
					produto.qtd = scn.nextInt();
				}
				boolean flag = sis.inserir(produto);
				if (flag) {
					System.out.println("Produto inserido com sucesso!");
				} else {
					System.out.println("Erro!");
				}
				break;
			case 1:
				System.out.println("Digite o codigo ou o nome do produto");
				String input = scn.nextLine();
				input = scn.nextLine();
				int inputInt;
				boolean flag1;
				try {
					inputInt = Integer.parseInt(input);

					flag1 = sis.excluir(inputInt);

				} catch (NumberFormatException e1) {
					flag1 = sis.excluir(input);
				}
				if (flag1) {
					System.out.println("Produto deletado com sucesso!");
				} else {
					System.out.println("Produto não encontrado.");
				}
				break;
			case 2:
				System.out.println("Digite os novos dados do produto");
				System.out.println("Nome:");
				Produto novoProduto = new Produto();
				novoProduto.nome = scn.nextLine();
				novoProduto.nome = scn.nextLine();
				while (novoProduto.nome.isEmpty()) {
					System.out.println("Nome vazio nao pode.");
					novoProduto.nome = scn.nextLine();
				}
				System.out.println("Marca:");
				novoProduto.marca = scn.nextLine();
				while (novoProduto.marca.isEmpty()) {
					System.out.println("Marca vazia nao pode.");
					novoProduto.marca = scn.nextLine();
				}
				System.out.println("Preco:");
				novoProduto.preco = scn.nextDouble();
				while (novoProduto.preco <= 0) {
					System.out.println("Preço negativo! Determine outro: ");
					novoProduto.preco = scn.nextDouble();
				}
				System.out.println("Quantidade:");
				novoProduto.qtd = scn.nextInt();
				while (novoProduto.qtd <= 0) {
					System.out.println("Quantidade negativa! Determine outra: ");
					novoProduto.qtd = scn.nextInt();
				}
				System.out.println("Digite o nome ou o codigo do produto que você deseja alterar");
				int inputInt_;
				String input_;
				Scanner scanner = new Scanner(System.in);
				input_ = scanner.nextLine();
				int index;
				try {
					inputInt_ = Integer.parseInt(input_);
					index = sis.buscarId(inputInt_);

				} catch (NumberFormatException e1) {
					index = sis.buscarNome(input_);
				}
				boolean flag2 = true;
				flag2 = sis.alterar(novoProduto, index);
				if (!flag2)
					System.out.println("Erro!");
				else
					System.out.println("Produto alterado com sucesso!");

				break;
			case 3:
				imprimirDesord(sis);
				break;
			case 4:
				System.out.println("Digite o codigo ou o nome do produto");
				String input4 = scn.nextLine();
				input4 = scn.nextLine();
				int index2;
				int inputInt4;
				try {
					inputInt4 = Integer.parseInt(input4);
					index2 = sis.buscarId(inputInt4);

				} catch (NumberFormatException e1) {
					index2 = sis.buscarNome(input4);
				}
				if (index2 > -1) {
					imprimirUm(index2, sis);
				} else {
					System.out.println("Produto não encontrado.");
				}
				break;
			case 5:
				imprimirOrd(sis);
				break;
			case 6:
				System.out.println("Digite o número desejado de espacos entre cada coluna");
				int leitura = scn.nextInt();
				while (leitura <= 0) {
					System.out.println("Número negativo nao pode, e nem 0");
					leitura = scn.nextInt();
				}
				sis.espacamento = Integer.toString(leitura);
				break;
			case 7:
				running = false;
				break;
			}
		}
		System.out.println("Operacoes finalizadas.");
		scn.close();
	}
	
	static Produto[] imprimirDesord(Sistema sis) {
		System.out.println(String.format(
				"%-" + sis.espacamento + "s%-" + sis.espacamento + "s%-" + sis.espacamento + "s%-" + sis.espacamento + "s", "Codigo",
				"Nome", "Preco", "Quantidade"));
		for (int i = 0; i < sis.lista.length; i++) {
			System.out.println(String.format(
					"%-" + sis.espacamento + "d%-" + sis.espacamento + "s%-" + sis.espacamento + ".2f%-" + sis.espacamento + "d",
					sis.lista[i].Id, sis.lista[i].nome, sis.lista[i].preco, sis.lista[i].qtd));
		}

		return sis.lista;

	}
	
	static Produto[] imprimirUm(int i, Sistema sis) {
		System.out.println(String.format(
				"%-" + sis.espacamento + "s%-" + sis.espacamento + "s%-" + sis.espacamento + "s%-" + sis.espacamento + "s%s", "Codigo",
				"Nome", "Marca", "Preco", "Quantidade"));
		System.out.println(String.format(
				"%-" + sis.espacamento + "d%-" + sis.espacamento + "s%-" + sis.espacamento + "s%-" + sis.espacamento + ".2f%d",
				sis.lista[i].Id, sis.lista[i].nome, sis.lista[i].marca, sis.lista[i].preco, sis.lista[i].qtd));
		return sis.lista;
	}
	
	static Produto[] imprimirOrd(Sistema sis) {
		Produto[] ArrayAux = new Produto[sis.lista.length];

		for (int i = 0; i < ArrayAux.length; i++) {
			ArrayAux[i] = new Produto();
		}

		ArrayAux = sis.organizarLista(ArrayAux);

		System.out.println(String.format("%-" + sis.espacamento + "s%-" + sis.espacamento + "s%-" + sis.espacamento + "s", "Nome",
				"Codigo", "Preco"));
		for (int i = 0; i < ArrayAux.length; i++) {
			System.out.println(String.format("%-" + sis.espacamento + "s%-" + sis.espacamento + "d%-" + sis.espacamento + ".2f",
					ArrayAux[i].nome, ArrayAux[i].Id, ArrayAux[i].preco));
		}
		return ArrayAux;

	}

}
