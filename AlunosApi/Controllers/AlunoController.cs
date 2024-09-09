using AlunosApi.Data;
using AlunosApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class AlunoController : ControllerBase
{
    private readonly AlunoContext _context;

    public AlunoController(AlunoContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Aluno>>> GetAlunos()
    {
        return await _context.Alunos.Include(a => a.AlunoCursos).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Aluno>> GetAluno(int id)
    {
        var aluno = await _context.Alunos.Include(a => a.AlunoCursos)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (aluno == null)
        {
            return NotFound();
        }

        return aluno;
    }

    [HttpPost]
    public async Task<ActionResult<Aluno>> PostAluno(Aluno aluno)
    {
        _context.Alunos.Add(aluno);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAluno), new { id = aluno.Id }, aluno);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAluno(int id, Aluno aluno)
    {
        if (id != aluno.Id)
        {
            return BadRequest();
        }

        _context.Entry(aluno).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AlunoExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAluno(int id)
    {
        var aluno = await _context.Alunos.FindAsync(id);
        if (aluno == null)
        {
            return NotFound();
        }

        _context.Alunos.Remove(aluno);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AlunoExists(int id)
    {
        return _context.Alunos.Any(e => e.Id == id);
    }
}