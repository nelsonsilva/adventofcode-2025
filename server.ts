const DAY_ROUTE = new URLPattern({ pathname: "/day/:day" });

async function handler(req: Request): Promise<Response> {
  const day = DAY_ROUTE.exec(req.url)?.pathname.groups.day;

  if (!day) {
    return new Response("Not found (try /day/1)", { status: 404 });
  }

  try {
    const module = await import(`./day${day}.ts`);

    if (typeof module.default !== "function") {
      return new Response("Handler must export a function", { status: 500 });
    }

    const iterator = module.default();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Loop through every 'yield' in the handler
          for await (const chunk of iterator) {
            controller.enqueue(chunk);
          }
        } catch (e) {
          // Handle errors inside the handler gracefully
          controller.enqueue(`\nError: ${e.message}\n`);
          console.error(`Day ${day} crashed:`, e);
        } finally {
          controller.close();
        }
      },
    });

    // Pipe it through the TextEncoderStream to handle UTF-8 characters/emojis correctly.
    return new Response(stream.pipeThrough(new TextEncoderStream()), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8", // Explicit charset is crucial
      },
    });
  } catch (e) {
    return new Response(`Error loading day ${day}: ${e.message}`, {
      status: 404,
    });
  }
}

if (import.meta.main) {
  Deno.serve(handler);
}
