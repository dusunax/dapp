import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {
  type Note = {
    title: Text;
    content: Text;
  };

  var notes: List.List<Note> = List.nil<Note>();

  // Note를 생성
  public func createNote(titleText: Text, contentText: Text){
    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes))
  };

  // Note를 읽기
  public query func readNotes(): async [Note]{
    return List.toArray(notes);
  };
}