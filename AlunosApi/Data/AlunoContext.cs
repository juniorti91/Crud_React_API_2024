using AlunosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Data
{
    public class AlunoContext : DbContext
    {
        public AlunoContext(DbContextOptions<AlunoContext> options) : base(options) { }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<AlunoCurso> AlunoCursos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AlunoCurso>()
                .HasOne(ac => ac.Aluno)
                .WithMany(a => a.AlunoCursos)
                .HasForeignKey(ac => ac.AlunoId);
        }
    }
}