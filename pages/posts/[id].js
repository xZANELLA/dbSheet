import { google } from 'googleapis';

export async function getServerSideProps({ query }) {

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });

    const sheets = google.sheets({ version: 'v4', auth });

    const { id } = query;
    const range = `produto!A${id}:B${id}`;

    //Put dados
    let values = [
        ["Teste1", "Teste2"]
      ];
      const data = [{
        range,
        values,
      }];
      // Additional ranges to update ...
      const resource = {
        data,
        valueInputOption: "RAW",
      };
      const response2 = await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: process.env.SHEET_ID,
        resource,
      }, (err, result) => {
        if (err) {
          // Handle error
          console.log(err);
        } else {
          console.log('%d cells updated.', result.totalUpdatedCells);
        }
      });



    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });
    
    const [title, content] = response.data.values[0];
    console.log(title, content)

    return { 
        props: {
            title,
            content
        } 
    }
    
}

export default function Post({ title, content }) {
    return <article>
        <h1>{title}</h1>
        <div>{content}</div>
    </article>
}

