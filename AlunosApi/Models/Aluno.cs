using System.Text.Json.Serialization;

namespace AlunosApi.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public bool Ativo { get; set; }

        [JsonIgnore]
        public List<AlunoCurso> AlunoCursos { get; set; } = new List<AlunoCurso>(); // Inicializa como lista vazia
    }

    public class AlunoCurso
    {
        public int Id { get; set; }
        public string CursoNome { get; set; }
        public int AlunoId { get; set; }
        public Aluno Aluno { get; set; }
    }
}
