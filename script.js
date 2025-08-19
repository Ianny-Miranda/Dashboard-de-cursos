// SPA - troca de telas
const links = document.querySelectorAll('nav a');
const screens = document.querySelectorAll('.subscreen');
links.forEach(link=>{
  link.addEventListener('click',()=>{
    const target = link.getAttribute('data-target');
    screens.forEach(s=>s.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

// Gráfico de progresso
const ctx = document.getElementById('progressChart').getContext('2d');
new Chart(ctx,{
  type:'doughnut',
  data:{
    labels:['Concluído','Restante'],
    datasets:[{data:[45,55], backgroundColor:['#00B894','#e0e0e0'], borderWidth:0}]
  },
  options:{cutout:'75%', plugins:{legend:{display:false}, tooltip:{enabled:false}}}
});

// Variáveis principais
let cursos = [];
let cursoAtual = 0;
let moduloAtual = 0;

const cursosListEl = document.getElementById('cursos-list');
const modulosListEl = document.getElementById('modulos-list');
const moduloContentEl = document.getElementById('modulo-content');
const cursoTituloEl = document.getElementById('curso-titulo');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const coursesContainer = document.querySelector('#dashboard .courses');

// Calcula duração aproximada de um curso
function calcularDuracaoCurso(curso) {
  return curso.modulos.reduce((acc, mod) => acc + (mod.videoDuracao || 0) + 2, 0); // 2 min por PDF
}

// Função para abrir curso na subtela
function abrirCurso(index){
  cursoAtual = index;
  moduloAtual = 0;
  gerarModulos();
  mostrarModulo(moduloAtual);
  screens.forEach(s=>s.classList.remove('active'));
  document.getElementById('cursos').classList.add('active');
}

// Gera lista de módulos
function gerarModulos(){
  modulosListEl.innerHTML = '';
  cursoTituloEl.textContent = cursos[cursoAtual].curso;
  cursos[cursoAtual].modulos.forEach((mod,i)=>{
    const li = document.createElement('li');
    li.textContent = mod.titulo;
    li.style.cursor = "pointer";
    li.onclick = ()=> mostrarModulo(i);
    modulosListEl.appendChild(li);
  });
}

// Mostra módulo selecionado
function mostrarModulo(index){
  moduloAtual = index;
  const mod = cursos[cursoAtual].modulos[moduloAtual];
  moduloContentEl.innerHTML = `
    <h3>${mod.titulo}</h3>
    <iframe src="${mod.pdf}" width="100%" height="250px"></iframe>
    <div class="video-container" style="margin-top:15px;">
      <iframe src="${mod.video}" frameborder="0" allowfullscreen width="100%" height="300px"></iframe>
    </div>
  `;
}

// Navegação entre módulos
prevBtn.onclick = ()=>{ if(moduloAtual>0) mostrarModulo(moduloAtual-1); }
nextBtn.onclick = ()=>{ if(moduloAtual<cursos[cursoAtual].modulos.length-1) mostrarModulo(moduloAtual+1); }

// Carrega cursos do JSON
fetch('cursos.json')
  .then(res => res.json())
  .then(data => {
    cursos = data;

    // Preenche lista da subtela "Cursos"
    cursos.forEach((c, i)=>{
      const li = document.createElement('li');
      li.textContent = c.curso;
      li.style.cursor = "pointer";
      li.onclick = ()=> abrirCurso(i);
      cursosListEl.appendChild(li);
    });

    // Preenche dashboard com cursos recomendados
    coursesContainer.innerHTML = '';
    cursos.forEach((curso, idx)=>{
      const duracao = calcularDuracaoCurso(curso);
      const card = document.createElement('div');
      card.className = 'course-card';
      card.innerHTML = `
        <h3>${curso.curso}</h3>
        <span>${duracao} min • Não iniciado</span>
        <button onclick="abrirCurso(${idx})">Abrir</button>
      `;
      coursesContainer.appendChild(card);
    });

  })
  .catch(err => console.error(err));

  const achievements = [
    { nome: 'Primeiro Curso', tipo: 'bronze' },
    { nome: '5 Cursos Concluídos', tipo: 'prata' },
    { nome: '100% de Progresso', tipo: 'ouro' }
  ];
  
  const achievementsContainer = document.getElementById('achievements-container');
  achievements.forEach(a => {
    const div = document.createElement('div');
    div.className = `achievement-card ${a.tipo}`;
    div.textContent = a.nome;
    achievementsContainer.appendChild(div);
  });

  // SPA Protocolos no Dashboard
const protocolos = document.querySelectorAll('.card.protocols ul li');
const protocoloCard = document.querySelector('.card.protocols');

// Conteúdos para cada protocolo (adapte o texto que quiser)
const protocoloConteudos = {
  "Segurança no Trabalho": "Conteúdo completo sobre Segurança no Trabalho...",
  "Compliance e Ética": "Conteúdo detalhado sobre Compliance e Ética...",
  "Gestão de Dados": "Informações importantes sobre Gestão de Dados...",
  "Atendimento ao Cliente": "Boas práticas e técnicas de Atendimento ao Cliente..."
};

// Cria área de exibição de conteúdo
let protocoloContent = document.createElement('div');
protocoloContent.className = 'protocolo-content';
protocoloCard.appendChild(protocoloContent);

// Adiciona clique para cada protocolo
protocolos.forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    // Remove highlight de todos
    protocolos.forEach(i => i.classList.remove('active'));
    // Adiciona highlight no selecionado
    item.classList.add('active');
    // Mostra conteúdo correspondente
    const key = item.textContent;
    protocoloContent.innerHTML = `<p>${protocoloConteudos[key]}</p>`;
  });
});

// Opcional: deixa o primeiro protocolo ativo por padrão
protocolos[0].click();

// Dados dos protocolos
const protocolosData = [
    {id: "seguranca", titulo: "Segurança no Trabalho", conteudo: "Aqui vai o texto longo sobre Segurança no Trabalho..."},
    {id: "compliance", titulo: "Compliance e Ética", conteudo: "Aqui vai o texto longo sobre Compliance e Ética..."},
    {id: "dados", titulo: "Gestão de Dados", conteudo: "Aqui vai o texto longo sobre Gestão de Dados..."},
    {id: "atendimento", titulo: "Atendimento ao Cliente", conteudo: "Aqui vai o texto longo sobre Atendimento ao Cliente..."}
  ];
  
  // Preenche lista de protocolos na subtela
  const protocolosListEl = document.getElementById('protocolos-list');
  protocolosData.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p.titulo;
    li.style.cursor = 'pointer';
    li.onclick = () => abrirProtocolo(p.id);
    protocolosListEl.appendChild(li);
  });
  
  // Botão voltar
  document.getElementById('backProtocolBtn').onclick = () => {
    screens.forEach(s=>s.classList.remove('active'));
    document.getElementById('dashboard').classList.add('active');
  };
  
  // Função para abrir protocolo
  function abrirProtocolo(id){
    const protocolo = protocolosData.find(p => p.id === id);
    document.getElementById('protocolo-titulo').textContent = protocolo.titulo;
    document.getElementById('protocolo-content').innerHTML = `<p>${protocolo.conteudo}</p>`;
    
    screens.forEach(s => s.classList.remove('active'));
    document.getElementById('protocolos').classList.add('active');
  }

  
  
