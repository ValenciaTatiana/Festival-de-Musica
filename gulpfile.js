import path from 'path'
import fs from 'fs'
import { glob } from 'glob'
import { src, dest, watch, series} from 'gulp' //Importar de la carpeta Gulp, las funciones de src y dest
// series permite ejecutar varias tareas al mismo tiempo
import * as dartSass from 'sass' //Importar todo de la carpeta Sass
import gulpSass from 'gulp-sass' //Importar la función gulpSass de la carpeta gulp-sass

const sass = gulpSass(dartSass) // Compilar Sass utilizando Gulp y en donde econtrar las dependencias de Sass

import terser from 'gulp-terser'
import sharp from 'sharp'

export function js ( done ) {
    src('src/js/index.js')
        .pipe(terser())
        .pipe( dest('dist/js') )
    done()
}
export function css( done ) {
    src('src/scss/app.scss', {sourcemaps: true}) // Buscamos el archivo en laruta y una vez encontrado ...
    .pipe( sass({
        outputStyle: "compressed"
    }) ) // Pasa aca y es compilado y luego ...
    .pipe( dest('dist/css', {sourcemaps: true}) ) // Es almacenado aca.

    done() // Para finalizar la ejecución de esta función
}

// Codigo de node.js y nos va ayudar hacer una tarea en especifico
// Busca la galeria con el tamaño grande y lo pone en una galeria con el tamaño mas pequeño
export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

// Busca y encuentra las imagenes
export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './dist/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

// Procesa las imagenes
function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

export function dev() {
    watch('src/scss/**/*.scss', css) // Cuando hayan cambios ejecuta la función css, con los * se hace referencia que todos los datos que tengan la exteción scss se ejecute la función.
    watch('src/js/**/*.js', js) 
    watch('src/img/**/*.{png,jpg}', imagenes) 
}

export default series( crop, js, css, imagenes, dev ) // series inicia una tarea y la finaliza, inicia la otra y la finaliza

// por otro lado esta parallel que hace casi lo mismo que series, lo que cambia es que este las inicializa toda al mimo tiempo