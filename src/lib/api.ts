export async function getHelloMessage() {
    const res = await fetch("http://localhost:4000/api/hello", {
        cache: "no-store",
    });
    return await res.json();
}
