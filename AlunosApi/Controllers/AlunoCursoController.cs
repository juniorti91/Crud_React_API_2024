using AlunosApi.Data;
using AlunosApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class AlunoCursoController : ControllerBase
{
    private readonly AlunoContext _context;

    public AlunoCursoController(AlunoContext context)
    {
        _context = context;
    }

    // GET: api/AlunoCurso
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlunoCurso>>> GetAlunoCursos()
    {
        return await _context.AlunoCursos.Include(ac => ac.Aluno).ToListAsync();
    }

    // GET: api/AlunoCurso/5
    [HttpGet("{id}")]
    public async Task<ActionResult<AlunoCurso>> GetAlunoCurso(int id)
    {
        var alunoCurso = await _context.AlunoCursos.Include(ac => ac.Aluno)
                                                   .FirstOrDefaultAsync(ac => ac.Id == id);

        if (alunoCurso == null)
        {
            return NotFound();
        }

        return alunoCurso;
    }

    // POST: api/AlunoCurso
    [HttpPost]
    public async Task<ActionResult<AlunoCurso>> PostAlunoCurso(AlunoCurso alunoCurso)
    {
        _context.AlunoCursos.Add(alunoCurso);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAlunoCurso), new { id = alunoCurso.Id }, alunoCurso);
    }

    // PUT: api/AlunoCurso/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAlunoCurso(int id, AlunoCurso alunoCurso)
    {
        if (id != alunoCurso.Id)
        {
            return BadRequest();
        }

        _context.Entry(alunoCurso).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AlunoCursoExists(id))
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

    // DELETE: api/AlunoCurso/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAlunoCurso(int id)
    {
        var alunoCurso = await _context.AlunoCursos.FindAsync(id);
        if (alunoCurso == null)
        {
            return NotFound();
        }

        _context.AlunoCursos.Remove(alunoCurso);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AlunoCursoExists(int id)
    {
        return _context.AlunoCursos.Any(e => e.Id == id);
    }
}
