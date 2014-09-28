var media = {
  _audioNode: $(".u-audio"),
  _audio: null,
  _audio_val: false,
  _videoNode: $(".j-video"),
  audio_init: function() {
    var b = {
      loop: true,
      autoplay: "autoplay",
	  preload: "auto",
      src: this._audioNode.attr("data-src")
    };
    this._audio = new Audio();
		
   /* for (var a in b) {
      if (b.hasOwnProperty(a) && (a in this._audio)) {
        this._audio[a] = b[a]
      }
    }*/
	this._audio['id'] = "bgmuisc";
	this._audio['loop'] = true;
	this._audio['autoplay'] = "autoplay";
	this._audio['preload'] = "load";
	this._audio['src'] = this._audioNode.attr("data-src");
	
    this._audio.load();
    document.getElementsByTagName("body")[0].appendChild(this._audio)
  },
  audio_addEvent: function() {
    if (this._audioNode.length <= 0) {
      return
    }
    var b = this._audioNode.find(".txt_audio"),
    c = null;
    $(this._audio).on("play",
    function() {
      a(b, true, c);
      global._handleEvent("audio_play")
    });
    $(this._audio).on("pause",
    function() {
      a(b, false, c);
      global._handleEvent("audio_pause")
    });
    function a(d, f, e) {
      if (f) {
        d.text("打开")
      } else {
        d.text("关闭")
      }
      if (e) {
        clearTimeout(e)
      }
      d.removeClass("z-move z-hide");
      e = setTimeout(function() {
        d.addClass("z-move").addClass("z-hide")
      },
      1000)
    }
  },
  audio_contorl: function() {
    if (!media._audio_val) {
      media._audioNode.addClass("close");
      media.audio_stop()
    } else {
      media._audioNode.removeClass("close");
      media.audio_play()
    }
  },
  audio_play: function() {
    media._audio_val = false;
    if (media._audio) {
      media._audio.play()
    }
  },
  audio_stop: function() {
    media._audio_val = true;
    if (media._audio) {
      media._audio.pause()
    }
  },
  video_init: function() {
    this._videoNode.each(function() {
      var a = {
        controls: "controls",
        preload: "none",
        width: $(this).attr("data-width"),
        height: $(this).attr("data-height"),
        src: $(this).attr("data-src")
      };
      var d = $('<video class="f-hide"></video>')[0];
      var b = $(this).find(".img");
      for (var c in a) {
        if (a.hasOwnProperty(c) && (c in d)) {
          d[c] = a[c]
        }
        this.appendChild(d)
      }
      $(d).on("play",
      function() {
        b.hide();
        $(d).removeClass("f-hide");
        if (media._audio) {
          media._audioNode.addClass("close");
          media._audio.pause()
        }
      });
      $(d).on("pause",
      function() {
        b.show();
        $(d).addClass("f-hide");
        if (!media._audio_val && media._audio) {
          media._audioNode.removeClass("close");
          media._audio.play()
        }
      });
      b.click(function() {
        d.play()
      })
    })
  },
  media_control: function() {
    if (!this._audio) {
      return
    }
    if ($("video").length <= 0) {
      return
    }
    $(this._audio).on("play",
    function() {
      $("video").each(function() {
        if (!this.paused) {
          this.pause()
        }
      })
    })
  },
  media_init: function() {
    this.audio_init();
    //this.video_init();
    this.audio_addEvent();
    this.media_control()
  }
};
$(window).on("load",
function() {
  media._audioNode.find(".btn_audio").on("click", media.audio_contorl);
  media.media_init();
});
$(window).on("unload",
function() {
  media._audio.pause();
  $(media._audio).remove()
});