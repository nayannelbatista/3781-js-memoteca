import ui from "./ui.js"
import api from "./api.js"

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos()

  const formularioPensamento = document.getElementById("pensamento-form")
  const botaoCancelar = document.getElementById("botao-cancelar")

  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
  botaoCancelar.addEventListener("click", manipularCancelamento)
})

async function manipularSubmissaoFormulario(event) {
  event.preventDefault();
  const id = document.getElementById("pensamento-id").value
  const conteudo = document.getElementById("pensamento-conteudo").value
  const autoria = document.getElementById("pensamento-autoria").value

  try{ 
    await api.salvarPensamento({ conteudo, autoria })
    ui.renderizarPensamentos()
  }
  catch {
    alert("Erro ao salvar pensamento")
  }
}

function manipularCancelamento() {
  ui.limparFormulario();
}

async function manipularCliqueBotaoEditar(event) {
  if(event.target.classList.contains("botao-editar")) {
    const id = event.target.parentElement.getAttibute("data-id")
    try {
      await api.buscarPensamentoPorId(id)
      if(pensamento) {
        ui.preencherFormulario(pensamento)
      }
    } catch (error) {
      alert("Erro ao editar pensamento")
    }
  }
}