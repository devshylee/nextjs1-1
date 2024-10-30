export default function Page(props) {
  console.log(props);
  return (
    <>
      <h1>foo : {props.params.foo}</h1>
      <h1>foo[] : {props.params.foo[1]}</h1>
      <h1>id : {props.params.id}</h1>
      <h1>name : {props.params.name}</h1>
    </>

app-router/src/app/blog/[[...foo]]/page.jsx
  );
}
