# Registro de Retirada — Belt Correias

App (PWA) para registrar, na expedição, os pedidos retirados — digitando ou
escaneando o número — gravando numa planilha Google via Apps Script.

## Novidades desta versão

- **Visual na identidade da Belt** (azul-marinho, azul e ciano; fonte Barlow Condensed).
- **Fila offline:** se estiver sem internet ou o envio falhar, o pedido é guardado
  no próprio celular e enviado automaticamente ao reconectar (nada se perde).
- **Aviso de duplicado:** avisa se o mesmo pedido já foi registrado hoje naquele aparelho.
- **Histórico na tela:** mostra os últimos registros confirmados, com nº e horário.
- **Apps Script reforçado:** chave de acesso, validação do número, gravação por nome
  de aba e uso do horário real da retirada (mesmo para itens enviados depois).

## Chave de acesso

O `index.html` (constante `CHAVE`) e o `google_apps_script.txt` (constante
`CHAVE_SECRETA`) precisam ter **o mesmo valor**. Para desligar a trava, deixe
`CHAVE_SECRETA = ""` no Apps Script.

## Como publicar

1. Suba todos os arquivos desta pasta para a hospedagem (mesma pasta, via HTTPS).
2. No Apps Script da planilha, cole o conteúdo de `google_apps_script.txt`,
   salve e **reimplante** (Implantar > Gerenciar implantações > Nova versão).
3. Abra o app no celular e toque em **Baixar app** para instalar.
