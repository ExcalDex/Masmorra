package trabalholuciano;

public class Sistema {
	Produto[] lista = new Produto[0];
	String espacamento = "14";

	boolean inserir(Produto produto) {
		produto.Id = lista.length;
		try {
			Integer.parseInt(produto.nome);
			return false;
		} catch (NumberFormatException e1) {

			aumentarTamanho();
			for (int i = 0; i < lista.length - 1; i++) {
				if (lista[i].nome.equalsIgnoreCase(produto.nome)) {
					diminuirTamanho();
					return false;
				}
			}

			lista[lista.length - 1] = produto;
			return true;
		}
	}

	void aumentarTamanho() {
		Produto[] ArrayAux = new Produto[lista.length + 1];
		for (int i = 0; i < lista.length; i++) {
			ArrayAux[i] = lista[i];
		}
		lista = ArrayAux;
	}
	
	void init() {
		Produto a = new Produto();
		a.nome = "Produto A";
		a.marca = "Marca A";
		a.preco = 10;

		this.inserir(a);

		Produto b = new Produto();
		b.nome = "Produto B";
		b.marca = "Marca B";
		b.preco = 10;
		b.qtd = 10;

		this.inserir(b);

		Produto c = new Produto();
		c.nome = "Produto C";
		c.marca = "Marca C";
		c.preco = 10;
		c.qtd = 10;

		this.inserir(c);

		Produto e = new Produto();
		e.nome = "Produto E";
		e.marca = "Marca E";
		e.preco = 10;
		e.qtd = 10;

		this.inserir(e);
		Produto d = new Produto();
		d.nome = "Produto D";
		d.marca = "Marca D";
		d.preco = 10;
		d.qtd = 10;

		this.inserir(d);
	}

	void diminuirTamanho() {
		Produto[] ArrayAux = new Produto[lista.length - 1];
		for (int i = 0; i < ArrayAux.length; i++) {
			ArrayAux[i] = lista[i];
		}
		lista = ArrayAux;
	}

	int buscarId(int id) {
		int posicao = -1;
		if (id < 0)
			return posicao;
		for (int i = 0; i < lista.length && posicao == -1; i++) {
			if (lista[i].Id == id)
				posicao = i;
		}
		return posicao;
	}

	int buscarNome(String nome) {
		int codigo = -1;
		for (int i = 0; i < lista.length && codigo == -1; i++) {
			if (lista[i].nome.equalsIgnoreCase(nome)) {
				codigo = i;
			}
		}
		return codigo;
	}

	void CortarFora(int codigo) {

		Produto[] ArrayAux = new Produto[lista.length - 1];

		System.arraycopy(lista, codigo + 1, lista, codigo, lista.length - codigo - 1);
		System.arraycopy(lista, 0, ArrayAux, 0, ArrayAux.length);

		lista = ArrayAux;

	}

	boolean excluir(int id) {

		int index = buscarId(id);

		if (index <= -1)
			return false;

		CortarFora(index);

		return true;
	}

	boolean excluir(String nome) {

		int index = buscarNome(nome);

		if (index <= -1)
			return false;

		CortarFora(index);

		return true;
	}

	boolean alterar(Produto produto, int index) {

		for (int i = 0; i < lista.length; i++) {
			if (lista[i].nome.equalsIgnoreCase(produto.nome))
				return false;
		}

		if (index > -1) {
			lista[index] = produto;
			return true;
		}

		return false;
	}


	Produto[] organizarLista(Produto[] ArrayAux) {
		for (int i = 0; i < ArrayAux.length; i++) {
			ArrayAux[i].nome = lista[i].nome;
			ArrayAux[i].Id = lista[i].Id;
			ArrayAux[i].marca = lista[i].marca;
			ArrayAux[i].preco = lista[i].preco;
			ArrayAux[i].qtd = lista[i].qtd;
		}

		for (int i = 0; i < ArrayAux.length - 1; i++) {
			for (int j = i + 1; j < ArrayAux.length; j++) {
				if (ArrayAux[i].nome.compareTo(ArrayAux[j].nome) == 1) {
					String auxString = ArrayAux[i].nome;
					ArrayAux[i].nome = ArrayAux[j].nome;
					ArrayAux[j].nome = auxString;

					int auxIntNumber = ArrayAux[i].Id;
					ArrayAux[i].Id = ArrayAux[j].Id;
					ArrayAux[j].Id = auxIntNumber;

					double auxDoubleNumber = ArrayAux[i].preco;
					ArrayAux[i].preco = ArrayAux[j].preco;
					ArrayAux[j].preco = auxDoubleNumber;
				}
			}
		}

		return ArrayAux;
	}
}
