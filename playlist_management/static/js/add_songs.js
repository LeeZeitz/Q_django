function refreshCSRFToken(){
	$.ajaxSetup({
		headers: { "X-CSRFToken": getCookie("csrftoken") }
	});
}

function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}

function songAddedAlert(msg) {
    var toggle = () => $('#song-added-alert').toggleClass('alert__hidden');
    toggle();
    setTimeout(function(){
        toggle()
    }, 2000);
}


function add_song(track_id) {
    refreshCSRFToken();
    $.ajax({
        type: 'POST',
        url: 'songs/add_songs',
        data: {
            'track_id': track_id
        },
        dataType: 'json',
        success: function (data) {
            songAddedAlert(data['data']['result']);
        }
    });
}

$(':button').click(function (event) {
    if (event.currentTarget.id != 'search') {
        add_song(event.currentTarget.id);
    }
});
