/*****************************************************************
 * 	設定
 ****************************************************************/
 class SettingClass {
	constructor() {
		this.mode = 0;
		this.wait = true;
		this.welcome = false;
		this.pagename = "btn1";
		this.btnLock = false;
		this.speakCnt = 1;
		this.isSpeak = false;
		this.isLock1 = true;
		this.isLock2 = true;
	}
}

/*****************************************************************
 * 	イベント
 ****************************************************************/
 $(window).on('load', function(){
	let sessionVal = sessionStorage.getItem('return');
	if(sessionVal === "TRUE") {
		$("#lastUpdDt").text("最終更新日：2021年6月9日");
		$("#Introduction1").hide();
		$("#Introduction2").show();
		sessionStorage.removeItem('return')
	}
});

/*****************************************************************
 * 	イベント
 ****************************************************************/
 $(function(){
	$('#btn').click(function(){
		$("#message").text("");
		viewText("しろは、おいしいごはんをたべました。");
	});

	/*****************************************************************
	 * 	モーダル閉じる押下
	 ****************************************************************/
	$('.modalClose').click(function(){
		$('.modal').fadeOut();
		$('#fadeLayer').fadeOut();
		if(setting.mode === 0) {
			setting.mode = 1;
			setting.wait = false;
		}
	});
	
	/*****************************************************************
	 * 	メニュー押下
	 ****************************************************************/
	 $('.btn').click(function(){
		let oldPagename = setting.pagename;
		let btnId = $(this).attr("id");
		if(btnId !== setting.pagename && !setting.btnLock) {
			setting.pagename = btnId;
			if(setting.mode === 2) {
				switch($(this).attr("id")) {
					case "btn1":
						$("#pageIntroduction").fadeOut();
						$("#pageSchedule").fadeOut();
						$("#pageTop").fadeIn();
						break;
					case "btn2":
						$("#pageTop").fadeOut();
						$("#pageSchedule").fadeOut();
						$("#pageIntroduction").fadeIn();
						setting.isLock1 = false;
						break;
					case "btn3":
						$("#pageTop").fadeOut();
						$("#pageIntroduction").fadeOut();
						$("#pageSchedule").fadeIn();
						break;
					case "btn4":
						if(setting.isLock1) {
							alert( "鍵が閉まっている…");
							$("#pageIntroduction").fadeOut();
							$("#pageSchedule").fadeOut();
							$("#pageTop").fadeIn();
							setting.pagename = "btn1";
						}
						else {
							setting.btnLock = true;
							$("#pageTop").fadeIn();
							$("#lastUpdDt").text("最終更新日：1999年3月9日");
							$("#pageIntroduction").fadeOut();
							$("#pageSchedule").fadeOut();
							if(!setting.welcome) {
								AudioPlay('#se1', 'voice/welcome.mp3', 0.2);
								setting.welcome = true;
							}
							setting.wait = false;
						}
						break;
				}
			}
			else if(setting.mode === 6) {
				if(btnId === "btn1") {
					AudioPlay('#se1', 'se/running1.mp3', 0.4);
					$('#fadeLayer').css("opacity", 1.0);
					$('#fadeLayer').show();
					setTimeout(function(){
						AudioStop('#bgm1', false);
						AudioPlay('#bgm1', 'bgm/n80.mp3', 0.1);
						$("#pageClassroom").hide();
						$("#pageTop").show();
						AudioStop('#se1', true);
						setTimeout(function(){
							$('#fadeLayer').hide();
						}, 150);
					}, 150);
				}
				else if(btnId === "btn2" && setting.speakCnt < 5) {
					AudioPlay('#se1', 'se/running1.mp3', 0.4);
					$('#fadeLayer').css("opacity", 1.0);
					$('#fadeLayer').show();
					setTimeout(function(){
						AudioStop('#bgm1', false);
						AudioPlay('#bgm1', 'se/waterdrops.mp3', 0.5);
						$("#pageTop").hide();
						$("#pageClassroom").show();
						$("#imgSerif").hide();
						AudioStop('#se1', true);
						setTimeout(function(){
							$('#fadeLayer').hide();
							setting.isSpeak = true;
						}, 150);
					}, 150);
				}
				else if(btnId === "btn2" && setting.speakCnt >= 5) {
					alert( "鍵が閉まっている…");
				}
				else if(btnId === "btn3") {
					alert( "鍵が閉まっている…");
					setting.pagename = "btn1";
					if(oldPagename !== "btn1") {
						AudioPlay('#se1', 'se/running1.mp3', 0.4);
						$('#fadeLayer').css("opacity", 1.0);
						$('#fadeLayer').show();
						setTimeout(function(){
							AudioStop('#bgm1', false);
							AudioPlay('#bgm1', 'bgm/n80.mp3', 0.1);
							$("#pageClassroom").hide();
							$("#pageTop").show();
							AudioStop('#se1', true);
							setTimeout(function(){
								$('#fadeLayer').hide();
							}, 150);
						}, 150);
					}
				}
				else if(btnId === "btn4" && setting.speakCnt < 5) {
					alert( "鍵が閉まっている…");
					setting.pagename = "btn1";
					if(oldPagename !== "btn1") {
						AudioPlay('#se1', 'se/running1.mp3', 0.4);
						$('#fadeLayer').css("opacity", 1.0);
						$('#fadeLayer').show();
						setTimeout(function(){
							AudioStop('#bgm1', false);
							AudioPlay('#bgm1', 'bgm/n80.mp3', 0.1);
							$("#pageClassroom").hide();
							$("#pageTop").show();
							AudioStop('#se1', true);
							setTimeout(function(){
								$('#fadeLayer').hide();
							}, 150);
						}, 150);
					}
				}
				else if(btnId === "btn4" && setting.speakCnt >= 5) {
					AudioStop('#bgm1', false);
					AudioPlay('#bgm1', 'bgm/n80.mp3', 0.1);
					$("#imgBack").attr('src', 'img/newspaper.png');
					$("#pageClassroom").hide();
					AudioPlay('#se2', 'se/newspaper.mp3', 0.5);
					$("#pageTop").show();
					setting.mode = 7;
				}
			}
			else if(setting.mode === 7) {
				if(confirm("元のサイトに戻りますか？")){
					AudioStop('#se2', false);
					AudioPlay('#se2', 'voice/Illbewaiting.mp3', 1.0);
					window.sessionStorage.setItem("return", "TRUE");
					setTimeout(function(){
						window.location.reload();
					}, 1500);
				}
			}
		}
	});

	/*****************************************************************
	 * 	メニュー押下
	 ****************************************************************/
	$('#imgBack').click(function(){
		if(setting.mode === 6) {
			setting.wait = false;
		}
	});

});

/*****************************************************************
 * 	メインロジック
 ****************************************************************/
var setting = new SettingClass();
setInterval(mainLogic, 1000);
function mainLogic() {
	if(!setting.wait) {

		/*****************************************************************
		 * 	モード選択時
		 ****************************************************************/
		if(setting.mode === 1) {
			setting.wait = true;
			setting.mode = 2;
			AudioPlay('#bgm1', 'se/kirakira.mp3', 0.1);
		}

		/*****************************************************************
		 * 	廃墟へ
		 ****************************************************************/
		else if(setting.mode === 2) {
			setting.wait = true;
			setting.mode = 3;
			let waitTime = 3500 + Random(2000);
			AudioStop('#bgm1', true);
			setTimeout(function(){
				setting.wait = false;
			},waitTime);
		}
		else if(setting.mode === 3) {
			setting.wait = true;
			setting.mode = 4;
			$('body').addClass("parallel");
			$('#logo').attr('src', 'img/logo2.png');
			$('#menu').removeClass("headerStyle");
			$('#menu').addClass("ParallelColor");
			$("#btn1").addClass("ParallelColor").text("遘√ｒ");
			$("#btn2").addClass("ParallelColor").text("謗｢縺励?");
			$("#btn3").addClass("ParallelColor").text("雋ｴ譁ｹ繧");
			$("#btn4").addClass("ParallelColor").text("谿ｺ縺");
			$("#btn5").addClass("ParallelColor").text("蜑阪↓");
			$("H1").text("星??中学・ュ露");
			AudioPlay('#se1', 'se/dark_attack.mp3', 0.5);
			$("#imgBack").attr('src', 'img/bk2.png');
			AudioPlay('#se2', 'se/death_sound1.mp3', 0.5);
			setTimeout(function(){
				setting.pagename = "btn1";
				setting.btnLock = false;
				setting.wait = false;
			}, 6000);
		}
		else if(setting.mode === 4) {
			setting.wait = true;
			setting.mode = 5;

			$('#fadeLayer').css("opacity", 1.0);
			$('#fadeLayer').show();
			setTimeout(function(){
				$("#imgBack").attr('src', 'img/bk4.png');
				$('#logo').attr('src', 'img/logo3.png');
				$('body').removeClass("parallel");
				$('body').addClass("parallel2");
				$('h1').addClass("parallel2");
				$('#menu, .btn').removeClass("ParallelColor");
				$('#menu, .btn').addClass("parallel2");
				AudioStop('#se1', true);
				AudioStop('#se2', true);
				setTimeout(function(){
					$('#fadeLayer').hide();
					setting.wait = false;
				}, 150);
			}, 0);
		}
		else if(setting.mode === 5) {
			setting.wait = true;
			setting.mode = 6;
			AudioPlay('#bgm1', 'bgm/n80.mp3', 0.1);
			setInterval(timeTurbulence, 500);
			setTimeout(function(){
				setting.wait = false;
			}, 1000);
		}
		else if(setting.mode === 6) {
			setting.btnLock = true
			setting.wait = true;
			if(setting.isSpeak) {
				setTimeout(function(){
					SpeakShiro();
				}, 2000);
			} else {
				setting.btnLock = false
				setting.wait = false;
			}
		}
		else {
			setting.wait = true;
		}
	}
}

/*****************************************************************
 * 	お喋り
 ****************************************************************/
function SpeakShiro() {

	if(setting.isSpeak && setting.speakCnt === 1) {
		AudioPlay('#se2', 'voice/hosikakejc_1_1.mp3', 0.6);
		$("#imgSerif").attr('src', "img/serif1.png");
		$("#imgSerif").fadeIn();
		setTimeout(function(){
			AudioStop('#se2', false);
			AudioPlay('#se2', 'voice/hosikakejc_1_2.mp3', 0.6);
			setTimeout(function(){
				AudioStop('#se2', false);
				AudioPlay('#se2', 'voice/hosikakejc_1_3.mp3', 0.6);
				AudioStop('#bgm1', false);
				setTimeout(function(){
					AudioStop('#se2', false);
					AudioPlay('#se2', 'voice/hosikakejc_1_4.mp3', 0.9);
					setTimeout(function(){
						AudioPlay('#bgm1', 'se/waterdrops.mp3', 0.5);
						setting.isSpeak = false;
						setting.btnLock = false
						setting.wait = false;
						setting.speakCnt = 2;
					}, 2000);
				}, 7500);
			}, 6000);
		}, 2500);
	}
	else if(setting.isSpeak && setting.speakCnt === 2) {
		AudioPlay('#se2', 'voice/hosikakejc_2_1.mp3', 0.6);
		$("#imgSerif").attr('src', "img/serif2.png");
		$("#imgSerif").fadeIn();
		setTimeout(function(){
			AudioStop('#se2', false);
			AudioPlay('#se2', 'voice/hosikakejc_2_2.mp3', 0.6);
			setTimeout(function(){
				AudioStop('#se2', false);
				AudioPlay('#se2', 'voice/hosikakejc_2_3.mp3', 0.6);
				AudioStop('#bgm1', false);
				setTimeout(function(){
					AudioStop('#se2', false);
					AudioPlay('#se2', 'voice/hosikakejc_2_4.mp3', 0.9);
					setTimeout(function(){
						AudioPlay('#bgm1', 'se/waterdrops.mp3', 0.5);
						setting.isSpeak = false;
						setting.btnLock = false
						setting.wait = false;
						setting.speakCnt = 3;
					}, 2000);
				}, 6500);
			}, 6000);
		}, 3000);
	}
	else if(setting.isSpeak && setting.speakCnt === 3) {
		AudioPlay('#se2', 'voice/hosikakejc_3_1.mp3', 0.6);
		$("#imgSerif").attr('src', "img/serif3.png");
		$("#imgSerif").fadeIn();
		setTimeout(function(){
			AudioStop('#se2', false);
			AudioPlay('#se2', 'voice/hosikakejc_3_2.mp3', 0.6);
			setTimeout(function(){
				AudioStop('#se2', false);
				AudioPlay('#se2', 'voice/hosikakejc_3_3.mp3', 0.6);
				AudioStop('#bgm1', false);
				setTimeout(function(){
					AudioStop('#se2', false)
					AudioPlay('#se2', 'voice/hosikakejc_3_4.mp3', 0.9);
					setTimeout(function(){
						AudioPlay('#bgm1', 'se/waterdrops.mp3', 0.5);
						setting.isSpeak = false;
						setting.btnLock = false
						setting.wait = false;
						setting.speakCnt = 4;
					}, 2000);
				}, 5000);
			}, 4000);
		}, 3000);
	}
	else if(setting.isSpeak && setting.speakCnt === 4) {
		AudioPlay('#se2', 'voice/hosikakejc_4_1.mp3', 0.6);
		$("#imgSerif").attr('src', "img/serif4.png");
		$("#imgSerif").fadeIn();
		setTimeout(function(){
			AudioStop('#se2', false);
			AudioPlay('#se2', 'voice/hosikakejc_4_2.mp3', 0.6);
			setTimeout(function(){
				AudioStop('#se2', false);
				AudioPlay('#se2', 'voice/hosikakejc_4_3.mp3', 0.6);
				AudioStop('#bgm1', false);
				setTimeout(function(){
					$("#imgSerif").fadeOut();
					AudioStop('#se2', false);
					AudioPlay('#se2', 'voice/hosikakejc_4_4.mp3', 1.0);
					AudioPlay('#se1', 'se/dark_attack.mp3', 0.7);
					$("#imgBack2").attr('src', "img/classroom2.png");
					setTimeout(function(){
						$("#imgBack2").attr('src', "img/classroom3.png");
						AudioPlay('#bgm1', 'se/waterdrops.mp3', 0.5);
						setting.isSpeak = false;
						setting.btnLock = false
						setting.wait = false;
						setting.speakCnt = 5;
					}, 1500);
				}, 4000);
			}, 4000);
		}, 3000);
	}
	else {
		setting.btnLock = false
		setting.wait = false;
	}
}

/*****************************************************************
 * 	テキスト表示
 ****************************************************************/
function viewText(text) {

	if(text.length > 0) {
		setTimeout(function(){
			let textTop = text.substr(0, 1);
			let textRext = text.substr(1, text.length -1);
			let messageText = $("#message").text() + textTop;
			$("#message").text(messageText);
			viewText(textRext);
		},60);
	}
}

/*****************************************************************
 * 	日時算出
 ****************************************************************/
function timeTurbulence() {
	let dd = Math.floor(Math.random()*23+9);
	$('#lastUpdDt').text("最終更新日：1999年3月" + dd + "日") ;
}

/*****************************************************************
 * 	ランダム
 ****************************************************************/
 function Random(maxValue) {
	return Math.floor(Math.random()*maxValue+1);
}

/*****************************************************************
 * 	サウンド
 ****************************************************************/
 function AudioPlay(idName, fileName, volume = 1.0) {
	if($(idName)[0].paused) {							// 停止中の場合のみ再生
		$(idName).attr('src', fileName);
		$(idName).get(0).volume = volume;				// ボリューム0.0 ～ 1.0
		$(idName).get(0).play();						// 再生
	}
}

function AudioStop(idName, isFadeOut, time = 200) {
	let volumeNow = $(idName).get(0).volume;
	if(volumeNow < 0.1 || !isFadeOut){					// ボリュームが0になれば停止
		$(idName).get(0).currentTime = 0;				// 再生位置を先頭に
		$(idName).get(0).pause();						// 停止
	}
	else {
		$(idName).get(0).volume = (volumeNow - 0.1);	// 音をフェードアウト
		setTimeout(function(){
			AudioStop(idName, isFadeOut, time);			// 再起呼び出し
		}, time);
	}
}
