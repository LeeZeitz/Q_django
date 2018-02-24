from django import forms

class SongSearchForm(forms.Form):
    song_search = forms.CharField(max_length=32, widget=forms.TextInput(attrs=({'class': 'song_search form-control'})))