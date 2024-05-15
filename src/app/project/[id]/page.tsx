export default function Project({params}){
    console.log(params);
    return (
        <>
            <h1>Projects {params.id}</h1>
        </>
    )
}