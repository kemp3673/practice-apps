import React from "react";

const WordList = (props) => {

  return (
    <div>
      {props.words.map((word, index) => (
        <li key={index}>
          <input type="button" value="Edit" onClick={() => props.updateForm()}/>&nbsp;
          <input type="button" value="Delete" onClick={() => props.delete(word.word)}/>&nbsp;
          <b>{word.word}</b>: {word.definition}
        </li>
      ))}
    </div>
  )

};

export default WordList;

{/* <form>
<input type="text" placholder="Enter Correct Spelling"/>
<input type="text" placholder="Enter New Definition"/>
</form> */}



// const btn = document.getElementById('btn');

// btn.addEventListener('click', () => {
//   const form = document.getElementById('form');

//   if (form.style.display === 'none') {
//     // 👇️ this SHOWS the form
//     form.style.display = 'block';
//   } else {
//     // 👇️ this HIDES the form
//     form.style.display = 'none';
//   }
// });