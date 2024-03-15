export default async function Books() {
    const response = await fetch('http://localhost:3000/api/books');
    const data = await response.json();
  
    console.log("books" ,data); 
  
    return (
        <div>
          {data?.length > 0 ? ( 
            <>
              <h1>Books</h1>
              {data.map((book:any) => (
                <div key={book.id}>
                  <h2>{book.label}</h2> <p>{book.author}</p>
                </div>
              ))}
            </>
          ) : (
            <p>No books found.</p>
          )}
        </div>
      );
  }
  