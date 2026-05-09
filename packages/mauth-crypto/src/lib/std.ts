export function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    // Si la entrada es interactiva (teclado), no hay pipe.
    // Resolvemos inmediatamente y salimos de la función.
    if (process.stdin.isTTY) {
      return resolve('');
    }

    let data = '';
    process.stdin.setEncoding('utf8');

    const onReadable = () => {
      let chunk;
      while ((chunk = process.stdin.read()) !== null) {
        data += chunk;
      }
    };

    const onEnd = () => {
      // Limpiamos los listeners para que Node pueda cerrar el proceso
      process.stdin.removeListener('readable', onReadable);
      process.stdin.removeListener('end', onEnd);
      resolve(data.trim());
    };

    process.stdin.on('readable', onReadable);
    process.stdin.on('end', onEnd);

    // Opcional: un timeout de seguridad por si el pipe se queda colgado
    setTimeout(() => {
      if (data === '') {
        process.stdin.removeListener('readable', onReadable);
        process.stdin.removeListener('end', onEnd);
        resolve('');
      }
    }, 200);
  });
}
