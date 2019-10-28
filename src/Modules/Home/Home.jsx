import React, { useRef } from 'react';

function MyForm() {
  const nameRef = useRef();
  const isRourterRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ firstname: nameRef.current.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" placeholder="Your Name" defaultValue="Seppe" ref={nameRef} />

      <label htmlFor="isRouter">Router?</label>
      <input type="checkbox" id="isRouter" defaultChecked ref={isRourterRef} />

      <button type="submit">Submit</button>
    </form>
  );
}

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <MyForm />
    </>
  );
}
