Template.body.onCreated(function() {
  this.store = new ReactiveVar({people: [], result: false});
  this.progress = new ReactiveVar(false);
});

Template.body.helpers({
  people() {
    let store = Template.instance().store.get();
    let people = store.people;
    return people;
  },
  result() {
    let store = Template.instance().store.get();
    return store.result;
  },
  winner() {
    let store = Template.instance().store.get();
    return store.winner || '';
  },
  progress() {
    return Template.instance().progress.get();
  }
});

Template.body.events({
  'submit [name=nameInputs]': (e, tmpl) => {
    e.preventDefault();
    let username = tmpl.find('[name=username]').value;
    if(username === '') {
      return;
    }
    let people = [...tmpl.store.get().people, username];
    tmpl.store.set({people});
    tmpl.find('[name=username]').value = '';
  },
  'click [name=submitBtn]': (e, tmpl) => {
    e.preventDefault();
    let people = tmpl.store.get().people;
    if (!people.length) {
      alert("최소 1명 이상 추가해주세요");
      return;
    }

    let winnerNum = Number(tmpl.find('[name=winnerNum]').value);
    let high = people.length;
    let low = 0;
    if(winnerNum === 1) {
      let winner = people[Math.floor(Math.random() * high)];
      tmpl.store.set({
        people,
        winner: [winner],
        result: true
      });
    } else {
      var winners = [];
      var nowLength = 0;
      do {
        var winner = people[Math.floor(Math.random() * high)];
        if(!_.contains(winners, winner)) {
          winners.push(winner);
        }
        nowLength = winners.length;
      }
      while (nowLength < winnerNum);
      tmpl.store.set({
        people,
        winner: [...winners],
        result: true
      });
    }
  }
});

Template.registerHelper('getRealNumber', function(number) {
  return number + 1;
});

// Idea Note
// 미리 개똥이 소똥이 같은 예시 이름 Array를 만들어놓고 빠른 참가를 누를 경우 그 중에서 랜덤으로
// 이름 골라서 바로 등록되도록 하는 게 좋을 거 같다
