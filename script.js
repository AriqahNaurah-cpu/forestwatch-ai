const nav=document.getElementById('nav');
document.getElementById('menuBtn').addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('themeBtn').addEventListener('click',()=>document.body.classList.toggle('light-mode'));
const change=document.getElementById('change'), changeVal=document.getElementById('changeVal');
change.addEventListener('input',()=>changeVal.textContent=change.value+'%');
function analyze(){
 const c=Number(change.value), q=document.getElementById('quality').value, area=Math.max(0,Number(document.getElementById('area').value)||0);
 const qAdj={high:10,medium:0,low:-18}[q];
 const score=Math.max(0,Math.min(100,Math.round(c*.85+Math.min(area,100)*.2+qAdj)));
 let status, explanation, next, color;
 if(q==='low'&&c<65){status='Perlu verifikasi';explanation='Kualitas citra rendah dapat menyamarkan atau meniru perubahan. Periksa citra lain sebelum memprioritaskan area.';next='Cari citra dengan awan lebih sedikit dan bandingkan tanggal pengamatan.';color='#e7a13d'}
 else if(score>=65){status='Prioritas tinjauan tinggi';explanation='Parameter simulasi menunjukkan perubahan yang relatif besar. Ini bukan bukti deforestasi terkonfirmasi.';next='Bandingkan citra multiwaktu dan verifikasi dengan data lapangan atau sumber independen.';color='#d85f54'}
 else if(score>=35){status='Perlu ditinjau';explanation='Ada indikasi perubahan yang patut diperiksa. Pertimbangkan kualitas citra dan konteks lokal.';next='Periksa citra sebelum dan sesudah, lalu verifikasi dengan sumber tambahan.';color='#e7a13d'}
 else{status='Pantau berkala';explanation='Parameter contoh saat ini menunjukkan prioritas tinjauan yang relatif rendah. Tetap lakukan pemantauan rutin.';next='Pantau citra berikutnya dan tinjau ulang jika muncul perubahan baru.';color='#2b9a65'}
 document.getElementById('status').textContent=status;
 document.getElementById('score').textContent=score+'/100';
 document.getElementById('areaResult').textContent=area.toLocaleString('id-ID')+' ha';
 document.getElementById('meterFill').style.width=score+'%';
 document.getElementById('statusDot').style.background=color;
 document.getElementById('explanation').textContent=explanation;
 document.getElementById('nextStep').textContent=next;
}
document.getElementById('analyze').addEventListener('click',analyze);
document.querySelectorAll('[data-case]').forEach(btn=>btn.addEventListener('click',()=>{
 const detail=document.getElementById('caseDetail');
 const content={
 patrol:'<b>Alur:</b> kumpulkan alert → cek kualitas dan tanggal citra → gabungkan dengan akses, batas kawasan, serta pengetahuan lokal → susun urutan pemeriksaan → verifikasi di lapangan dengan prosedur keselamatan.',
 dashboard:'<b>Alur:</b> kelompokkan alert menurut lokasi dan waktu → tampilkan tren serta status verifikasi → bedakan alert mentah dari kejadian terkonfirmasi → dokumentasikan sumber, ketidakpastian, dan pembaruan data.'
 };
 detail.innerHTML=content[btn.dataset.case];detail.hidden=false;detail.scrollIntoView({behavior:'smooth',block:'nearest'});
}));
analyze();
