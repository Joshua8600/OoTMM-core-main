#ifndef COMBO_OOT_SEQUENCE_H
#define COMBO_OOT_SEQUENCE_H

#include <combo/data/sequence.h>

#define NA_BGM_STOP 0x100000FF

typedef enum {
    /* 0 */ SEQ_PLAYER_BGM_MAIN,
    /* 1 */ SEQ_PLAYER_FANFARE,
    /* 2 */ SEQ_PLAYER_SFX,
    /* 3 */ SEQ_PLAYER_BGM_SUB
} SequencePlayerId;

typedef enum {
    /* 0 */ SEQ_MODE_DEFAULT,
    /* 1 */ SEQ_MODE_ENEMY,
    /* 2 */ SEQ_MODE_STILL, // Not moving or first-person view
    /* 3 */ SEQ_MODE_IGNORE
} SequenceMode;

typedef enum {
    /* 0x0 */ CHANNEL_IO_PORT_0,
    /* 0x1 */ CHANNEL_IO_PORT_1,
    /* 0x2 */ CHANNEL_IO_PORT_2,
    /* 0x3 */ CHANNEL_IO_PORT_3,
    /* 0x4 */ CHANNEL_IO_PORT_4,
    /* 0x5 */ CHANNEL_IO_PORT_5,
    /* 0x6 */ CHANNEL_IO_PORT_6,
    /* 0x7 */ CHANNEL_IO_PORT_7
} ChannelIOPort;

typedef enum {
    /* 0x0 */ NATURE_CHANNEL_STREAM_0,
    /* 0x1 */ NATURE_CHANNEL_CRITTER_0,
    /* 0x2 */ NATURE_CHANNEL_CRITTER_1,
    /* 0x3 */ NATURE_CHANNEL_CRITTER_2,
    /* 0x4 */ NATURE_CHANNEL_CRITTER_3,
    /* 0x5 */ NATURE_CHANNEL_CRITTER_4,
    /* 0x6 */ NATURE_CHANNEL_CRITTER_5,
    /* 0x7 */ NATURE_CHANNEL_CRITTER_6,
    /* 0x8 */ NATURE_CHANNEL_CRITTER_7,
    /* 0xC */ NATURE_CHANNEL_STREAM_1 = 12,
    /* 0xD */ NATURE_CHANNEL_UNK,
    /* 0xE */ NATURE_CHANNEL_RAIN,
    /* 0xF */ NATURE_CHANNEL_LIGHTNING
} NatureChannelIdx; // playerIdx = 0 (Overlaps with main bgm)

typedef enum {
    /* 0x00 */ NATURE_ID_GENERAL_NIGHT,
    /* 0x01 */ NATURE_ID_MARKET_ENTRANCE,
    /* 0x02 */ NATURE_ID_KAKARIKO_REGION,
    /* 0x03 */ NATURE_ID_MARKET_RUINS,
    /* 0x04 */ NATURE_ID_KOKIRI_REGION,
    /* 0x05 */ NATURE_ID_MARKET_NIGHT,
    /* 0x06 */ NATURE_ID_06,
    /* 0x07 */ NATURE_ID_GANONS_LAIR,
    /* 0x08 */ NATURE_ID_08,
    /* 0x09 */ NATURE_ID_09,
    /* 0x0A */ NATURE_ID_WASTELAND,
    /* 0x0B */ NATURE_ID_COLOSSUS,
    /* 0x0C */ NATURE_ID_DEATH_MOUNTAIN_TRAIL,
    /* 0x0D */ NATURE_ID_0D,
    /* 0x0E */ NATURE_ID_0E,
    /* 0x0F */ NATURE_ID_0F,
    /* 0x10 */ NATURE_ID_10,
    /* 0x11 */ NATURE_ID_11,
    /* 0x12 */ NATURE_ID_12,
    /* 0x13 */ NATURE_ID_NONE,
    /* 0xFF */ NATURE_ID_DISABLED = 0xFF
} NatureAmbienceId;

typedef enum {
    /* 0x00 */ NATURE_STREAM_RUSHING_WATER,
    /* 0x01 */ NATURE_STREAM_HOWLING_WIND,
    /* 0x02 */ NATURE_STREAM_SCREECHING_WIND,
    /* 0x03 */ NATURE_STREAM_SCREECHING_WIND_ALT1
} NatureStreamId;

typedef enum {
    /* 0x00 */ NATURE_CRITTER_BIRD_CHIRP_1,
    /* 0x01 */ NATURE_CRITTER_TAP,
    /* 0x02 */ NATURE_CRITTER_BIRD_CHIRP_2,
    /* 0x03 */ NATURE_CRITTER_BIRD_CHIRP_1_ALT1,
    /* 0x04 */ NATURE_CRITTER_CRICKETS,
    /* 0x05 */ NATURE_CRITTER_BIRD_CHIRP_1_ALT2,
    /* 0x06 */ NATURE_CRITTER_LOUD_CHIRPING,
    /* 0x07 */ NATURE_CRITTER_BIRD_CHIRP_1_ALT3,
    /* 0x08 */ NATURE_CRITTER_BIRD_CHIRP_1_ALT4,
    /* 0x09 */ NATURE_CRITTER_CROWS_CAWS,
    /* 0x0A */ NATURE_CRITTER_SMALL_BIRD_CHIRPS,
    /* 0x0B */ NATURE_CRITTER_BIRD_SCREECH,
    /* 0x0C */ NATURE_CRITTER_BIRD_SONG,
    /* 0x0D */ NATURE_CRITTER_OWL_HOOT,
    /* 0x0E */ NATURE_CRITTER_HAWK_SCREECH,
    /* 0x0F */ NATURE_CRITTER_BIRD_CALL,
    /* 0x10 */ NATURE_CRITTER_CAWING_BIRD,
    /* 0x11 */ NATURE_CRITTER_CUCCO_CROWS,
    /* 0x12 */ NATURE_CRITTER_BIRD_CHIRP_2_ALT1,
    /* 0x13 */ NATURE_CRITTER_BIRD_CHIRP_1_ALT5
} NatureAmimalId;

#define NATURE_IO_CRITTER_0_TYPE(type)        NATURE_CHANNEL_CRITTER_0, CHANNEL_IO_PORT_2, type
#define NATURE_IO_CRITTER_0_BEND_PITCH(bend)  NATURE_CHANNEL_CRITTER_0, CHANNEL_IO_PORT_3, bend
#define NATURE_IO_CRITTER_0_NUM_LAYERS(num)   NATURE_CHANNEL_CRITTER_0, CHANNEL_IO_PORT_4, num
#define NATURE_IO_CRITTER_0_PORT5(reverb)     NATURE_CHANNEL_CRITTER_0, CHANNEL_IO_PORT_5, reverb

#define NATURE_IO_CRITTER_1_TYPE(type)        NATURE_CHANNEL_CRITTER_1, CHANNEL_IO_PORT_2, type
#define NATURE_IO_CRITTER_1_BEND_PITCH(bend)  NATURE_CHANNEL_CRITTER_1, CHANNEL_IO_PORT_3, bend
#define NATURE_IO_CRITTER_1_NUM_LAYERS(num)   NATURE_CHANNEL_CRITTER_1, CHANNEL_IO_PORT_4, num
#define NATURE_IO_CRITTER_1_PORT5(reverb)     NATURE_CHANNEL_CRITTER_1, CHANNEL_IO_PORT_5, reverb

#define NATURE_IO_CRITTER_2_TYPE(type)        NATURE_CHANNEL_CRITTER_2, CHANNEL_IO_PORT_2, type
#define NATURE_IO_CRITTER_2_BEND_PITCH(bend)  NATURE_CHANNEL_CRITTER_2, CHANNEL_IO_PORT_3, bend
#define NATURE_IO_CRITTER_2_NUM_LAYERS(num)   NATURE_CHANNEL_CRITTER_2, CHANNEL_IO_PORT_4, num
#define NATURE_IO_CRITTER_2_PORT5(reverb)     NATURE_CHANNEL_CRITTER_2, CHANNEL_IO_PORT_5, reverb

#define NATURE_IO_CRITTER_3_TYPE(type)        NATURE_CHANNEL_CRITTER_3, CHANNEL_IO_PORT_2, type
#define NATURE_IO_CRITTER_3_BEND_PITCH(bend)  NATURE_CHANNEL_CRITTER_3, CHANNEL_IO_PORT_3, bend
#define NATURE_IO_CRITTER_3_NUM_LAYERS(num)   NATURE_CHANNEL_CRITTER_3, CHANNEL_IO_PORT_4, num
#define NATURE_IO_CRITTER_3_PORT5(reverb)     NATURE_CHANNEL_CRITTER_3, CHANNEL_IO_PORT_5, reverb

#define NATURE_IO_CRITTER_4_TYPE(type)        NATURE_CHANNEL_CRITTER_4, CHANNEL_IO_PORT_2, type
#define NATURE_IO_CRITTER_4_BEND_PITCH(bend)  NATURE_CHANNEL_CRITTER_4, CHANNEL_IO_PORT_3, bend
#define NATURE_IO_CRITTER_4_NUM_LAYERS(num)   NATURE_CHANNEL_CRITTER_4, CHANNEL_IO_PORT_4, num
#define NATURE_IO_CRITTER_4_PORT5(reverb)     NATURE_CHANNEL_CRITTER_4, CHANNEL_IO_PORT_5, reverb

#define NATURE_IO_CRITTER_5_TYPE(type)        NATURE_CHANNEL_CRITTER_5, CHANNEL_IO_PORT_2, type
#define NATURE_IO_CRITTER_5_BEND_PITCH(bend)  NATURE_CHANNEL_CRITTER_5, CHANNEL_IO_PORT_3, bend
#define NATURE_IO_CRITTER_5_NUM_LAYERS(num)   NATURE_CHANNEL_CRITTER_5, CHANNEL_IO_PORT_4, num
#define NATURE_IO_CRITTER_5_PORT5(reverb)     NATURE_CHANNEL_CRITTER_5, CHANNEL_IO_PORT_5, reverb

#define NATURE_IO_CRITTER_6_TYPE(type)        NATURE_CHANNEL_CRITTER_6, CHANNEL_IO_PORT_2, type
#define NATURE_IO_CRITTER_6_BEND_PITCH(bend)  NATURE_CHANNEL_CRITTER_6, CHANNEL_IO_PORT_3, bend
#define NATURE_IO_CRITTER_6_NUM_LAYERS(num)   NATURE_CHANNEL_CRITTER_6, CHANNEL_IO_PORT_4, num
#define NATURE_IO_CRITTER_6_PORT5(reverb)     NATURE_CHANNEL_CRITTER_6, CHANNEL_IO_PORT_5, reverb

#define NATURE_IO_STREAM_0_TYPE(type)         NATURE_CHANNEL_STREAM_0, CHANNEL_IO_PORT_2, type
#define NATURE_IO_STREAM_0_PORT3(data)        NATURE_CHANNEL_STREAM_0, CHANNEL_IO_PORT_3, data
#define NATURE_IO_STREAM_0_PORT4(data)        NATURE_CHANNEL_STREAM_0, CHANNEL_IO_PORT_4, data

#define NATURE_IO_STREAM_1_TYPE(type)         NATURE_CHANNEL_STREAM_1, CHANNEL_IO_PORT_2, type
#define NATURE_IO_STREAM_1_PORT3(data)        NATURE_CHANNEL_STREAM_1, CHANNEL_IO_PORT_3, data
#define NATURE_IO_STREAM_1_PORT4(data)        NATURE_CHANNEL_STREAM_1, CHANNEL_IO_PORT_4, data

#define NATURE_IO_ENTRIES_END 0xFF

#endif
