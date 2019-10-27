package classearch.search.API;

import java.util.Map;
import java.util.Objects;

public class Meeting implements Comparable<Meeting>{
    private final String code;
    private final String room;
    private final String component;
    private final int number;
    private final String dayTime;
    private final Map<String, String> instructor;

    public String getCode() {
        return code;
    }

    public String getRoom() {
        return room;
    }

    public int getNumber() {
        return number;
    }

    public String getComponent() {
        return component;
    }

    public String getDayTime() {
        return dayTime;
    }

    public Map<String, String> getInstructor() {
        return instructor;
    }

    private Meeting(String code, String room, String component, int number, String dayTime, Map<String, String> instructor) {
        this.code = code;
        this.room = room;
        this.component = component;
        this.number = number;
        this.dayTime = dayTime;
        this.instructor = instructor;
    }

    @Override
    public String toString() {
        return "Meeting{" +
                "code='" + code + '\'' +
                ", room='" + room + '\'' +
                ", component='" + component + '\'' +
                ", number=" + number +
                ", dayTime='" + dayTime + '\'' +
                ", instructor='" + instructor + '\'' +
                '}';
    }

    public static final Meeting of(String code, String room, String component, int number, String dayTime, Map<String, String> instructor){
        Objects.requireNonNull(code, "code can not be null");
        Objects.requireNonNull(room, "room can not be null");
        Objects.requireNonNull(component, "component can not be null");
        Objects.requireNonNull(dayTime, "dayTime can not be null");
        Objects.requireNonNull(instructor, "instructor can not be null");

        return new Meeting(code, room, component, number, dayTime, instructor);
    }

    @Override
    public int compareTo(Meeting meeting) {
        return Integer.compare(this.number, meeting.number);
    }
}
