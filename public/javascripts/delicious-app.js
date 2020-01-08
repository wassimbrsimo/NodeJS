import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import makeMap from './modules/map';
import ajaxHeart from './modules/heart';
import {storesAjax,next,prev} from './modules/storesAjax';

storesAjax($('.stores'),$('p'))

autocomplete( $('#address'), $('#lat'), $('#lng') );

typeAhead( $('.search') );
makeMap( $('#map') );


const nex= $$('form.next');
nex.on('submit',(e)=>{e.preventDefault(); next($('.stores'),$('p'))});

const back= $$('form.prev');
back.on('submit',(e)=>{e.preventDefault(); prev($('.stores'),$('p'))});

const heartForms = $$('form.heart');
heartForms.on('submit', ajaxHeart);
