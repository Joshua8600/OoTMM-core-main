#ifndef OVL_EN_IK
#define OVL_EN_IK

#include <combo.h>

struct Actor_EnIk;

typedef void (*Actor_EnIkActionFunc)(struct Actor_EnIk*, PlayState*);

#define IK_GET_ARMOR_TYPE(thisx) ((thisx)->params & 0xFF)

typedef enum IronKnuckleLimb
{
    IRON_KNUCKLE_LIMB_NONE,
    IRON_KNUCKLE_LIMB_ROOT,
    IRON_KNUCKLE_LIMB_TASSET_CENTER,
    IRON_KNUCKLE_LIMB_TASSET_RIGHT,
    IRON_KNUCKLE_LIMB_RIGHT_LEG,
    IRON_KNUCKLE_LIMB_RIGHT_FOOT,
    IRON_KNUCKLE_LIMB_TASSET_LEFT,
    IRON_KNUCKLE_LIMB_LEFT_LEG,
    IRON_KNUCKLE_LIMB_LEFT_FOOT,
    IRON_KNUCKLE_LIMB_UPPER_BODY_ROOT,
    IRON_KNUCKLE_LIMB_UNK_ROOT,
    IRON_KNUCKLE_LIMB_HEAD_ROOT,
    IRON_KNUCKLE_LIMB_HELMET_ARMOR,
    IRON_KNUCKLE_LIMB_HEAD,
    IRON_KNUCKLE_LIMB_RIGHT_UPPER_ARM,
    IRON_KNUCKLE_LIMB_RIGHT_FOREARM,
    IRON_KNUCKLE_LIMB_AXE_ROOT,
    IRON_KNUCKLE_LIMB_AXE,
    IRON_KNUCKLE_LIMB_RIGHT_HAND,
    IRON_KNUCKLE_LIMB_LEFT_UPPER_ARM,
    IRON_KNUCKLE_LIMB_LEFT_FOREARM,
    IRON_KNUCKLE_LIMB_LEFT_HAND,
    IRON_KNUCKLE_LIMB_UPPER_LEFT_PAULDRON,
    IRON_KNUCKLE_LIMB_LOWER_LEFT_PAULDRON,
    IRON_KNUCKLE_LIMB_UPPER_RIGHT_PAULDRON,
    IRON_KNUCKLE_LIMB_LOWER_RIGHT_PAULDRON,
    IRON_KNUCKLE_LIMB_CHEST_ARMOR_FRONT,
    IRON_KNUCKLE_LIMB_CHEST_ARMOR_BACK,
    IRON_KNUCKLE_LIMB_TORSO,
    IRON_KNUCKLE_LIMB_WAIST,
    IRON_KNUCKLE_LIMB_MAX
} IronKnuckleLimb;

typedef enum Actor_EnIkType
{
    IK_TYPE_SILVER = 1,
    IK_TYPE_BLACK,
    IK_TYPE_WHITE
}
Actor_EnIkType;

typedef struct IronKnuckleEffect
{
    Gfx* dList;
    Vec3f pos;
    Vec3f velocity;
    Vec3s rot;
    s32 enabled;
}
IronKnuckleEffect;

typedef enum IronKnuckleBodyPart {
    IRON_KNUCKLE_BODYPART_TASSET_RIGHT,
    IRON_KNUCKLE_BODYPART_RIGHT_LEG,
    IRON_KNUCKLE_BODYPART_RIGHT_FOOT,
    IRON_KNUCKLE_BODYPART_TASSET_LEFT,
    IRON_KNUCKLE_BODYPART_LEFT_LEG,
    IRON_KNUCKLE_BODYPART_LEFT_FOOT,
    IRON_KNUCKLE_BODYPART_HELMET_ARMOR,
    IRON_KNUCKLE_BODYPART_RIGHT_FOREARM,
    IRON_KNUCKLE_BODYPART_RIGHT_HAND,
    IRON_KNUCKLE_BODYPART_LEFT_FOREARM,
    IRON_KNUCKLE_BODYPART_LEFT_HAND,
    IRON_KNUCKLE_BODYPART_LOWER_LEFT_PAULDRON,
    IRON_KNUCKLE_BODYPART_LOWER_RIGHT_PAULDRON,
    IRON_KNUCKLE_BODYPART_MAX
} IronKnuckleBodyPart;

typedef enum IronKnuckleArmorBodyPart
{
    IRON_KNUCKLE_ARMOR_BODYPART_HELMET,
    IRON_KNUCKLE_ARMOR_BODYPART_CHEST_FRONT,
    IRON_KNUCKLE_ARMOR_BODYPART_CHEST_BACK,
    IRON_KNUCKLE_ARMOR_BODYPART_UPPER_LEFT_PAULDRON,
    IRON_KNUCKLE_ARMOR_BODYPART_UPPER_RIGHT_PAULDRON,
    IRON_KNUCKLE_ARMOR_BODYPART_LOWER_LEFT_PAULDRON,
    IRON_KNUCKLE_ARMOR_BODYPART_LOWER_RIGHT_PAULDRON,
    IRON_KNUCKLE_ARMOR_BODYPART_MAX
} IronKnuckleArmorBodyPart;

typedef struct Actor_EnIk
{
    Actor actor;
    SkelAnime skelAnime;
    Vec3s jointTable[IRON_KNUCKLE_LIMB_MAX];
    Vec3s morphTable[IRON_KNUCKLE_LIMB_MAX];
    Actor_EnIkActionFunc actionFunc;
    u8 drawArmorFlags;
    u8 drawDmgEffType;
    s16 timer;
    s16 blurEffectSpawnLock;
    s16 subCamId;
    s16 invincibilityFrames;
    s32 effectIndex;
    f32 drawDmgEffAlpha;
    f32 drawDmgEffScale;
    f32 drawDmgEffFrozenSteamScale;
    Vec3f bodyPartsPos[IRON_KNUCKLE_BODYPART_MAX];
    ColliderCylinder colliderCylinder;
    ColliderQuad colliderQuad;
    ColliderTris colliderTris;
    ColliderTrisElement shieldColliderElements[2];
    IronKnuckleEffect effects[IRON_KNUCKLE_ARMOR_BODYPART_MAX];
}
Actor_EnIk;

#endif
