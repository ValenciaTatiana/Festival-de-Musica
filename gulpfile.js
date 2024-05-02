import { src, dest, watch} from 'gulp' //Importar de la carpeta Gulp, las funciones de src y dest
import * as dartSass from 'sass' //Importar todo de la carpeta Sass
import gulpSass from 'gulp-sass' //Importar la función gulpSass de la carpeta gulp-sass

const sass = gulpSass(dartSass) // Compilar Sass utilizando Gulp y en donde econtrar las dependencias de Sass

export function css( done ) {
    src('src/scss/app.scss') // Bucamos el archivo en laruta y una vez encontrado ...
    .pipe( sass() ) // Pasa aca y es compilado y luego ...
    .pipe( dest('dist/css') ) // Es almacenado aca.

    done() // Para finalizar la ejecución de esta función
}

export function dev() {
    watch('src/scss/app.scss', css) // Cuando hayan cambios ejecuta la función css
}