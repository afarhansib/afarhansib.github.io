// Javascript Is Awesome!!
// Navigasi dengan menu kiri bawah

// inisiasi DOM
const mIB = document.querySelectorAll('.mIB');
const pages = document.querySelectorAll('.page');
const tglAutoPlay = document.querySelector('#tAutoplay');
const tglDarkMode = document.querySelector('#tDarkMode');
let tO;
let timoutSetInterval;
let intervalAcak;
let halDiacak = 4;
let acak = true;
// page current
let pageNow = 1
// aksi jika diklik
mIB.forEach(function(btn) {
	btn.addEventListener('click', function() {
		clearInterval(intervalAcak)
		clearTimeout(timoutSetInterval)
		// console.log(acak);
		if (acak) {
			timoutSetInterval = setTimeout(function(){
				clearInterval(intervalAcak)
				acakPage()
			}, 5000)
		}
		let dataId = this.getAttribute('data-id')
		// console.log(dataId)
		// hilangkan class active pada semua tombol
		mIB.forEach(function(btn) {
			btn.classList.remove('menuBActive')
		})
		// tambahkan class active pada tombol yang diklik
		this.classList.add('menuBActive')

		// ubah page
		ubahPage(dataId)
		// ubah variable pageNow yang sesuai
		// regex hilangin huruf
		pageNow = Number(dataId.replace( /^\D+/g, ''))
		// console.log(pageNow);
		// console.log(dataId);
	})
})

// --otomatisasi
// variable toggleAutoplay
let tAutoplay = tglAutoPlay.getAttribute('checked') //sesuai saat membuat di html
// cek jika toggle autoplay checked
if ( tAutoplay == "true" ) {
	// jalankan fungsi auto ganti page secara acak :v
	acakPage()
}
tglAutoPlay.addEventListener('change', function(event){
	// console.log(stateNow);
	if ( event.target.checked ) {
		acak = true
		clearInterval(intervalAcak)
		acakPage()
	} else {
		acak = false
		clearTimeout(timoutSetInterval)
		clearInterval(intervalAcak)
	}

})

// dark mode :3
tglDarkMode.addEventListener('change', function(event) {
	if ( event.target.checked ) {
		document.querySelector('body').setAttribute('data-theme', 'dark')
	} else {
		document.querySelector('body').setAttribute('data-theme', 'light')
	}
})

// functions
// fungsi acak page
function acakPage() {
	// buat Loop waktu
	intervalAcak = setInterval(function(){
		// buat random nomor dari 1-3
		let nPage = Math.floor((Math.random() * halDiacak) + 1)
		// console.log(nPage);
		// console.log(pageNow);
		nPage = nPage == pageNow ? nPage + 1 : nPage
		nPage = nPage == (halDiacak + 1) ? 1 : nPage
		// console.log(nPage);

		// ubah tombol
		mIB.forEach(function(btn) {
			btn.classList.remove('menuBActive')
		})
		mIB[nPage - 1].classList.add('menuBActive')
		// ubah page
		ubahPage('page'+nPage)
		pageNow = nPage
	}, 5000)
}
// fungsi ubah page
function ubahPage(data) {
		// hilangkan class show pada semua page
		pages.forEach(function(page){
			page.classList.remove('pageShow')
			tO = setTimeout(function(){
				page.classList.add('pageHidden')
				// page.style.display = 'none'
			}, 400)
			// tambahkan class show pada page yang memiliki
			// data-id sesuai dengan tombol yang diklik
			if (page.classList.contains(data)) {
				clearTimeout(tO)
				page.classList.remove('pageHidden')
				page.classList.add('pageShow')
			}
		})
}