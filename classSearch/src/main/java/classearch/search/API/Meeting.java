package classearch.search.API;

import java.util.Objects;

public class Meeting implements Comparable<Meeting>{
    private final String term;
    private final String code;
    private final String room;
    private final int number;
    private final String dayTime;
    private final String instructor;

    public String getTerm() {
        return term;
    }

    public String getCode() {
        return code;
    }

    public String getRoom() {
        return room;
    }

    public int getNumber() {
        return number;
    }

    public String getDayTime() {
        return dayTime;
    }

    public String getInstructor() {
        return instructor;
    }

    private Meeting(String term, String code, String room, int number, String dayTime, String instructor) {
        this.term = term;
        this.code = code;
        this.room = room;
        this.number = number;
        this.dayTime = dayTime;
        this.instructor = instructor;
    }

    public static final Meeting of(String term, String code, String room, Integer number, String dayTime, String instructor){
        Objects.requireNonNull(term, "term can not be null");
        Objects.requireNonNull(code, "code can not be null");
        Objects.requireNonNull(room, "room can not be null");
        Objects.requireNonNull(number, " class's number can not be null");
        Objects.requireNonNull(dayTime, "dayTime can not be null");
        Objects.requireNonNull(instructor, "instructor can not be null");

        return new Meeting(term, code, room, number, dayTime, instructor);
    }

    @Override
    public int compareTo(Meeting meeting) {
        return Integer.compare(this.number, meeting.number);
    }
}
