import './ProductDescriptionBlocks.css';

const pick = (obj, lang) => obj?.[lang] || obj?.en || '';

const ProductDescriptionBlocks = ({ blocks = [], language = 'en' }) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <div className="pdb-wrap">
      {blocks.map((block, idx) => {
        const heading = pick(block.heading, language);

        if (block.type === 'paragraph') {
          const text = pick(block.text, language);
          if (!text && !heading) return null;
          return (
            <section key={idx} className="pdb-block pdb-paragraph">
              {heading && <h3 className="pdb-heading">{heading}</h3>}
              {text && text.split('\n').filter(Boolean).map((para, i) => (
                <p key={i} className="pdb-text">{para}</p>
              ))}
            </section>
          );
        }

        if (block.type === 'bullets') {
          const items = (block.items || []).map((it) => pick(it, language)).filter(Boolean);
          if (items.length === 0 && !heading) return null;
          return (
            <section key={idx} className="pdb-block pdb-bullets">
              {heading && <h3 className="pdb-heading">{heading}</h3>}
              <ul className="pdb-bullet-list">
                {items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>
          );
        }

        if (block.type === 'featured') {
          const items = (block.items || []).map((it) => pick(it, language)).filter(Boolean);
          if (items.length === 0 && !heading) return null;
          return (
            <section key={idx} className="pdb-block pdb-featured">
              {heading && <h3 className="pdb-heading">{heading}</h3>}
              <div className="pdb-featured-grid">
                {items.map((item, i) => (
                  <div key={i} className="pdb-featured-item">
                    <span className="pdb-featured-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pdb-featured-text">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (block.type === 'specs') {
          const rows = (block.rows || []).filter((r) => pick(r.label, language) || pick(r.value, language));
          if (rows.length === 0 && !heading) return null;
          return (
            <section key={idx} className="pdb-block pdb-specs">
              {heading && <h3 className="pdb-heading">{heading}</h3>}
              <table className="pdb-specs-table">
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <th>{pick(row.label, language)}</th>
                      <td>{pick(row.value, language)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
};

export default ProductDescriptionBlocks;
